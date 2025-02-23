import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from io import BytesIO

app = Flask(__name__)

# Load the pre-trained model
model = load_model('improved_skin_detection.h5')

# Class name mapping for human-readable labels
class_names = {
    'akiec': 'Actinic Keratoses',
    'bcc': 'Basal Cell Carcinoma',
    'mel': 'Melanoma',
    'nv': 'Melanocytic Nevi',
    'df': 'Dermatofibroma',
    'bkl': 'Benign Keratosis-like Lesions',
    'vasc': 'Vascular Lesions'
}

# Route to handle image prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file:
        try:
            # Convert the uploaded file to a format that can be processed
            img = image.load_img(BytesIO(file.read()), target_size=(128, 128))  # Resize to 128x128
            
            # Convert the image to a numpy array
            img_array = image.img_to_array(img)
            
            # Expand the dimensions to match the expected input shape of the model (1, 128, 128, 3)
            img_array = np.expand_dims(img_array, axis=0)
            
            # Normalize the image
            img_array = img_array / 255.0
            
            # Make the prediction
            prediction = model.predict(img_array)
            
            # Get the predicted class
            predicted_class = np.argmax(prediction, axis=1)
            
            # Map predicted class index to human-readable label
            predicted_label = list(class_names.values())[predicted_class[0]]
            
            return jsonify({'prediction': predicted_label}), 200
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
