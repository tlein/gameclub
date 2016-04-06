from server import app, api
from flask_restful import Resource, reqparse
from urllib.parse import urlencode

import json
import http.client as httplib

class Search(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('searchTerms')
        args = parser.parse_args()
        conn = httplib.HTTPConnection('www.giantbomb.com')
        params = {
            'api_key': app.config['GIANT_BOMB_API_KEY'],
            'format': 'json',
            'query': args['searchTerms'],
            'resources': 'game',
            'field_list': 'name,image,id,description'
        }
        conn.request('GET', '/api/search/?' + urlencode(params), None, {'User-Agent': 'GameClubSealMan'})
        response = json.loads('{\"response\":' + conn.getresponse().read().decode('utf-8') + '}')
        return response['response']

api.add_resource(Search, '/search')
