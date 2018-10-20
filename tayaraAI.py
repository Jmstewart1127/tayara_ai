from django_common.http import json_response
from flask import Flask, request
from flask.ext.uploads import UploadSet, configure_uploads, IMAGES

app = Flask(__name__, static_url_path='/static')

photos = UploadSet('photos', IMAGES)

app.config['UPLOADED_PHOTOS_DEST'] = 'static/img'
configure_uploads(app, photos)

from clarifai.rest import ClarifaiApp

ai_app = None


@app.route('/predict', methods=['POST'])
def predict():
    image_url = request.data['image']
    model = ai_app.public_models.general_model
    response = model.predict_by_url(url=image_url)
    return json_response({
        'response': response
    }, status_code=201)


@app.route('/upload', methods=['POST'])
def upload():
    filename = photos.save(request.files['photo'])
    return json_response({'name': filename}, status_code=201)


if __name__ == '__main__':
    ai_app = ClarifaiApp(api_key='3d82c70b4f4a4b028b992399737ac043')
    app.run(host='0.0.0.0', port=94001)
