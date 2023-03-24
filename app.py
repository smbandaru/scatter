from flask import Flask, request, jsonify
import pandas as pd
from scipy import stats

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    data = pd.read_csv(file)
    x = data['x']
    y = data['y']
    print(x)
    print(y)

    res = stats.linregress(x, y)

    return {'slope':res.slope,'intercept':res.intercept}


@app.route('/fitModel', methods=['POST'])
def fitModel():
    json_data = request.get_json()

    x = json_data['x']
    y = json_data['y']

    res = stats.linregress(x, y)

    return {'slope':res.slope,'intercept':res.intercept}

if __name__ == '__main__':
    app.run(debug=True)