# Dataset

The `split_dataset/` folder (not committed to this repo — it's tens of thousands of images) holds the
"New Plant Diseases Dataset (Augmented)" — an augmented version of the PlantVillage leaf-image dataset,
already split into train/valid/test. Search Kaggle for that exact dataset name to download it, then place
it here so the structure looks like:

```
data/
└── split_dataset/
    ├── train/
    │   ├── Apple___Apple_scab/
    │   ├── Apple___Black_rot/
    │   ├── ...
    │   └── Tomato___healthy/
    ├── valid/
    │   └── ... (same 38 class folders)
    └── test/
        └── ... (same 38 class folders)
```

38 classes across 14 crop species (Apple, Blueberry, Cherry, Corn, Grape, Orange, Peach, Pepper, Potato,
Raspberry, Soybean, Squash, Strawberry, Tomato), each folder named `<Species>___<Condition>`. The notebook
in `notebooks/` reads this directory via `tf.keras.utils.image_dataset_from_directory` and derives the
class list/count directly from these folder names.
