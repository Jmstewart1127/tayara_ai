from flask import Flask, request
from flask.ext.uploads import UploadSet, configure_uploads, IMAGES
from flask import json

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
    ai_respo = model.predict_by_url(url=image_url)
    response = app.response_class(
        response=json.dumps({'response': ai_respo}),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/upload', methods=['POST'])
def upload():
    filename = photos.save(request.files['photo'])
    response = app.response_class(
        response=json.dumps({'name': filename}),
        status=200,
        mimetype='application/json'
    )
    return response


if __name__ == '__main__':
    ai_app = ClarifaiApp(api_key='3d82c70b4f4a4b028b992399737ac043')
    app.run(host='0.0.0.0', port=94001)
