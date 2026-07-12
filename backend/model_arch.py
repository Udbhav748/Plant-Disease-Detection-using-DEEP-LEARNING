"""
Hybrid CBAM + EfficientNetB0 + ViT architecture, mirrored from
notebooks/plant_disease_hybrid_model.ipynb (Cell 2: build_hybrid).

Kept as a separate definition (rather than tf.keras.models.load_model on the
.h5 directly) because Keras 3's functional-model JSON deserializer fails on
this model's CBAM block ("too many positional arguments" reconstructing the
avg+max tensor addition as an implicit merge node) regardless of TF/Keras
patch version. Rebuilding the graph from code and loading only the weights
(model.load_weights) sidesteps that broken path entirely - do not switch this
back to load_model without re-verifying against the installed Keras version.
"""

import tensorflow as tf
from tensorflow.keras import layers, Model


def cbam_block(x, ratio=8):
    channel = x.shape[-1]

    avg_pool = layers.GlobalAveragePooling2D()(x)
    max_pool = layers.GlobalMaxPooling2D()(x)

    shared = layers.Dense(channel // ratio, activation='relu')

    avg = shared(avg_pool)
    max = shared(max_pool)

    channel_att = layers.Dense(channel, activation='sigmoid')(avg + max)
    channel_att = layers.Reshape((1, 1, channel))(channel_att)

    x = layers.Multiply()([x, channel_att])

    avg_sp = layers.Lambda(lambda z: tf.reduce_mean(z, axis=-1, keepdims=True))(x)
    max_sp = layers.Lambda(lambda z: tf.reduce_max(z, axis=-1, keepdims=True))(x)

    concat = layers.Concatenate()([avg_sp, max_sp])

    spatial_att = layers.Conv2D(1, 7, padding='same', activation='sigmoid')(concat)

    x = layers.Multiply()([x, spatial_att])

    return x


def create_cnn_cbam(inputs):
    # weights=None: we load our own trained weights right after building, so
    # there's no need to also download ImageNet weights on every startup.
    base = tf.keras.applications.EfficientNetB0(
        include_top=False,
        weights=None,
        input_tensor=inputs
    )

    base.trainable = False

    x = base.output
    x = cbam_block(x)
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dense(512, activation='relu')(x)

    return x


def create_vit(inputs, patch=16, dim=64, heads=4, layers_n=4):
    patches = layers.Conv2D(
        dim,
        kernel_size=patch,
        strides=patch,
        padding="valid"
    )(inputs)

    n_patches = (224 // patch) * (224 // patch)

    x = layers.Reshape((n_patches, dim))(patches)

    pos = tf.range(start=0, limit=n_patches, delta=1)

    pos_embed = layers.Embedding(
        input_dim=n_patches,
        output_dim=dim
    )(pos)

    x = x + pos_embed

    for _ in range(layers_n):
        attn = layers.MultiHeadAttention(
            num_heads=heads,
            key_dim=dim
        )(x, x)

        x = layers.Add()([x, attn])
        x = layers.LayerNormalization()(x)

        ffn = layers.Dense(dim * 2, activation="relu")(x)
        ffn = layers.Dense(dim)(ffn)

        x = layers.Add()([x, ffn])
        x = layers.LayerNormalization()(x)

    x = layers.Flatten()(x)
    x = layers.Dense(512, activation="relu")(x)

    return x


def build_hybrid(num_classes):
    inputs = layers.Input(shape=(224, 224, 3))

    cnn_feat = create_cnn_cbam(inputs)
    vit_feat = create_vit(inputs)

    fusion = layers.Concatenate()([cnn_feat, vit_feat])

    x = layers.Dense(1024, activation="relu")(fusion)
    x = layers.Dropout(0.4)(x)

    outputs = layers.Dense(num_classes, activation="softmax")(x)

    model = Model(inputs, outputs)

    return model
