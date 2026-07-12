// Reference info keyed by the exact class names the backend returns
// (see backend/main.py CLASS_NAMES). Purely informational content for the
// UI - not used for inference.

const HEALTHY_INFO = {
  description: "No signs of disease were detected on this leaf.",
  treatment: "No treatment needed - the plant appears healthy.",
  prevention: "Keep up regular watering, balanced fertilization, and routine pest monitoring.",
};

const DISEASE_INFO = {
  "Apple___Apple_scab": {
    description:
      "A fungal disease caused by Venturia inaequalis, producing olive-green to black spots on leaves and fruit.",
    treatment:
      "Apply a labeled fungicide (e.g. captan or myclobutanil) starting at green tip and repeat per label instructions; remove heavily infected leaves.",
    prevention:
      "Rake up and destroy fallen leaves in autumn, prune for better airflow, and favor scab-resistant cultivars.",
  },
  "Apple___Black_rot": {
    description:
      "A fungal disease (Botryosphaeria obtusa) causing purple-bordered leaf spots and fruit rot with concentric rings.",
    treatment: "Prune out cankers and dead wood, then apply fungicide sprays through the growing season.",
    prevention: "Remove mummified fruit and dead wood promptly, and avoid unnecessary bark wounds.",
  },
  "Apple___Cedar_apple_rust": {
    description:
      "A fungal disease that alternates between apple and juniper/cedar hosts, causing bright orange-yellow leaf spots.",
    treatment: "Apply protectant fungicide from pink bud through several weeks after petal fall.",
    prevention: "Remove nearby juniper/cedar hosts where practical, and plant rust-resistant apple varieties.",
  },
  "Apple___healthy": HEALTHY_INFO,
  "Blueberry___healthy": HEALTHY_INFO,
  "Cherry_(including_sour)___Powdery_mildew": {
    description:
      "A fungal disease (Podosphaera clandestina) that coats leaves and shoots in a white powdery growth.",
    treatment: "Apply sulfur or potassium-bicarbonate-based fungicide at the first sign of infection.",
    prevention: "Prune for airflow, avoid excess nitrogen fertilizer, and choose resistant varieties.",
  },
  "Cherry_(including_sour)___healthy": HEALTHY_INFO,
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": {
    description:
      "A fungal disease (Cercospora zeae-maydis) producing rectangular gray-tan lesions along leaf veins.",
    treatment: "Apply a foliar fungicide when lesions first appear, especially on susceptible hybrids.",
    prevention: "Rotate crops away from corn, till under residue, and plant resistant hybrids.",
  },
  "Corn_(maize)___Common_rust_": {
    description:
      "A fungal disease (Puccinia sorghi) that produces reddish-brown pustules on both sides of the leaf.",
    treatment: "Apply fungicide if infection is severe and caught early in susceptible hybrids.",
    prevention: "Plant rust-resistant hybrids and avoid unusually late planting in high-risk areas.",
  },
  "Corn_(maize)___Northern_Leaf_Blight": {
    description:
      "A fungal disease (Exserohilum turcicum) causing long, cigar-shaped gray-green lesions on leaves.",
    treatment: "Foliar fungicides can help if applied as soon as lesions appear.",
    prevention: "Rotate crops, manage crop residue, and plant resistant hybrids.",
  },
  "Corn_(maize)___healthy": HEALTHY_INFO,
  "Grape___Black_rot": {
    description:
      "A fungal disease (Guignardia bidwellii) causing brown circular leaf spots and shriveled, mummified fruit.",
    treatment: "Apply fungicide from bud break through fruit set, and remove mummified berries.",
    prevention: "Prune for airflow and remove infected plant debris from the vineyard floor.",
  },
  "Grape___Esca_(Black_Measles)": {
    description:
      "A complex fungal trunk disease causing tiger-stripe leaf discoloration and spotted, shriveled berries.",
    treatment: "There is no effective cure; remove and destroy severely infected vines or wood.",
    prevention: "Avoid pruning during wet weather and protect fresh pruning cuts to limit infection.",
  },
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
    description: "A fungal disease causing angular brown leaf lesions that can lead to early defoliation.",
    treatment: "Apply a protectant fungicide during the growing season.",
    prevention: "Remove fallen leaves, improve canopy airflow, and avoid overhead irrigation.",
  },
  "Grape___healthy": HEALTHY_INFO,
  "Orange___Haunglongbing_(Citrus_greening)": {
    description:
      "A bacterial disease spread by the Asian citrus psyllid, causing blotchy mottled leaves and bitter, misshapen fruit. There is no cure.",
    treatment: "Remove and destroy infected trees to slow spread, and control psyllid populations with insecticide.",
    prevention: "Monitor and control Asian citrus psyllid, and use certified disease-free nursery stock.",
  },
  "Peach___Bacterial_spot": {
    description: "A bacterial disease causing small, dark, angular spots on leaves and lesions on fruit.",
    treatment: "Apply copper-based bactericide during dormancy and early in the growing season.",
    prevention: "Plant resistant varieties, avoid overhead irrigation, and prune for good airflow.",
  },
  "Peach___healthy": HEALTHY_INFO,
  "Pepper,_bell___Bacterial_spot": {
    description: "A bacterial disease causing water-soaked spots that turn brown and necrotic on leaves and fruit.",
    treatment: "Apply copper-based bactericide and remove infected plant debris.",
    prevention: "Use certified disease-free seed, rotate crops, and avoid overhead watering.",
  },
  "Pepper,_bell___healthy": HEALTHY_INFO,
  "Potato___Early_blight": {
    description: "A fungal disease (Alternaria solani) causing dark, concentric-ring spots, usually on lower leaves first.",
    treatment: "Apply a labeled fungicide at first symptoms and remove heavily infected foliage.",
    prevention: "Rotate crops, maintain balanced soil fertility, and avoid plant water stress.",
  },
  "Potato___Late_blight": {
    description:
      "An aggressive oomycete disease (Phytophthora infestans) causing rapidly spreading, water-soaked lesions.",
    treatment: "Apply fungicide promptly at first sign, and remove and destroy infected plants.",
    prevention: "Use certified disease-free seed potatoes, avoid overhead irrigation, and monitor closely in cool, wet weather.",
  },
  "Potato___healthy": HEALTHY_INFO,
  "Raspberry___healthy": HEALTHY_INFO,
  "Soybean___healthy": HEALTHY_INFO,
  "Squash___Powdery_mildew": {
    description: "A fungal disease that coats leaves and stems with a white, powdery growth.",
    treatment: "Apply sulfur, potassium bicarbonate, or another labeled fungicide at the first sign of disease.",
    prevention: "Plant resistant varieties, space plants for airflow, and avoid excess nitrogen fertilizer.",
  },
  "Strawberry___Leaf_scorch": {
    description:
      "A fungal disease (Diplocarpon earlianum) causing small purple spots that merge into scorched-looking patches.",
    treatment: "Apply fungicide during the growing season and remove infected leaves after harvest.",
    prevention: "Renovate beds after harvest, avoid overhead irrigation, and ensure good plant spacing.",
  },
  "Strawberry___healthy": HEALTHY_INFO,
  "Tomato___Bacterial_spot": {
    description: "A bacterial disease causing small, dark, water-soaked spots on leaves and fruit.",
    treatment: "Apply copper-based bactericide and avoid working in fields while foliage is wet.",
    prevention: "Use certified disease-free seed and transplants, rotate crops, and avoid overhead watering.",
  },
  "Tomato___Early_blight": {
    description: "A fungal disease (Alternaria solani) with concentric-ring spots, typically starting on older leaves.",
    treatment: "Apply fungicide at first symptoms and remove affected leaves.",
    prevention: "Rotate crops, mulch to reduce soil splash, and stake plants for better airflow.",
  },
  "Tomato___Late_blight": {
    description:
      "An aggressive oomycete disease (Phytophthora infestans) causing greasy, dark lesions on leaves, stems, and fruit.",
    treatment: "Apply fungicide promptly at first sign, and remove and destroy infected plants.",
    prevention: "Avoid overhead irrigation, ensure good spacing and airflow, and monitor closely during cool, wet weather.",
  },
  "Tomato___Leaf_Mold": {
    description:
      "A fungal disease (Passalora fulva) common in humid conditions, showing yellow spots on top and olive mold underneath.",
    treatment: "Improve ventilation, reduce humidity, and apply fungicide if needed.",
    prevention: "Increase airflow, avoid prolonged leaf wetness, and use resistant varieties where available.",
  },
  "Tomato___Septoria_leaf_spot": {
    description: "A fungal disease causing small circular spots with dark borders and gray centers on lower leaves.",
    treatment: "Apply fungicide at first sign and remove infected lower leaves.",
    prevention: "Rotate crops, mulch, avoid overhead watering, and stake plants for airflow.",
  },
  "Tomato___Spider_mites Two-spotted_spider_mite": {
    description: "A pest infestation causing stippled, yellowing leaves and fine webbing on the underside.",
    treatment: "Apply a miticide or insecticidal soap/horticultural oil, and increase humidity to discourage mites.",
    prevention: "Monitor regularly, avoid drought stress, and encourage natural predator insects.",
  },
  "Tomato___Target_Spot": {
    description: "A fungal disease (Corynespora cassiicola) causing brown lesions with concentric rings.",
    treatment: "Apply fungicide at first symptoms and remove infected foliage.",
    prevention: "Rotate crops, improve airflow, and avoid prolonged leaf wetness.",
  },
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
    description:
      "A viral disease spread by whiteflies, causing upward leaf curling, yellowing, and stunted growth. There is no cure.",
    treatment: "Remove and destroy infected plants to reduce spread, and manage whitefly populations.",
    prevention: "Control whiteflies, use resistant varieties, and consider reflective mulches or row covers.",
  },
  "Tomato___Tomato_mosaic_virus": {
    description: "A viral disease causing mottled light and dark green leaf patterns and stunted growth. There is no cure.",
    treatment: "Remove and destroy infected plants, and sanitize tools and hands after handling.",
    prevention: "Use virus-free seed, control aphids, and sanitize tools between plants.",
  },
  "Tomato___healthy": HEALTHY_INFO,
};

export function isHealthyClass(className) {
  return className.endsWith("___healthy");
}

export function parseClassName(className) {
  const [cropRaw, conditionRaw] = className.split("___");
  const crop = (cropRaw || "").replace(/_/g, " ").replace(/,\s*/g, " ").trim();
  const condition = (conditionRaw || "").replace(/_/g, " ").trim();
  return { crop, condition };
}

export function formatDisplayName(className) {
  const { crop, condition } = parseClassName(className);
  if (isHealthyClass(className)) return `${crop} — Healthy`;
  return `${crop} — ${condition}`;
}

export function getDiseaseInfo(className) {
  return (
    DISEASE_INFO[className] || {
      description: "No additional information is available for this class.",
      treatment: "Consult a local agricultural extension service for guidance.",
      prevention: "Practice good crop sanitation and monitor plants regularly.",
    }
  );
}
