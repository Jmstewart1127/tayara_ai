import os

from flask import Flask, request
from flask import json
from werkzeug.utils import secure_filename

app = Flask(__name__, static_url_path='/static')

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

app.config['UPLOAD_FOLDER'] = 'static/img'

from clarifai.rest import ClarifaiApp

ai_app = None

categories = {
    'Immobiliere': {
        'Apparetment': ['house']
    },
    'Véhicules': {
        'Voiture': []
    },
    'Pour la Maison et Jardin': {

    },
    'Loisirs et Divertissement': {

    },
    'Informatique et Multimedia': {
        'Téléphones': ['phone', 'telephone', 'screen'],
        'Image & Son': [],
        'Ordinateur portables': ['computer', 'laptop'],
        'Tablettes': [],
        'Télévisions': ['tele', 'television', 'tv']
    },
    'Emploi et Services': {

    },
    'Habillement et Bien Etre': {

    },
    'Entreprises': {

    }
}


@app.route('/predict', methods=['POST'])
def predict():
    image_url = request.json['image']
    model = ai_app.public_models.general_model
    ai_respo = model.predict_by_url(url=image_url)
    concept = ai_respo['outputs'][0]['data']['concepts'][0]['name']
    category = None
    sub_category = None
    for item, value in categories.items():
        print(item)
        for subitem, value in value.items():
            print(subitem)
            print(concept.lower())
            if concept.lower() in map(str.lower, value):
                category = item
                sub_category = subitem

    response = app.response_class(
        response=json.dumps({'category': category, 'sub_category': sub_category}),
        status=200,
        mimetype='application/json'
    )
    return response

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload():
    response = None
    if 'image' not in request.files:
        response = app.response_class(
            response=json.dumps({'error': 'No file to upload'}),
            status=400,
            mimetype='application/json'
        )
    image = request.files['image']
    if image.filename == '':
        response = app.response_class(
            response=json.dumps({'error': 'No file to upload'}),
            status=400,
            mimetype='application/json'
        )
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        response = app.response_class(
            response=json.dumps({'image': filename}),
            status=200,
            mimetype='application/json'
        )

    return response


if __name__ == '__main__':
    ai_app = ClarifaiApp(api_key='3d82c70b4f4a4b028b992399737ac043')
    app.run(host='0.0.0.0', port=4902)
