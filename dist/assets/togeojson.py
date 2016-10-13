from geojson import Feature, Point, FeatureCollection
import geojson
import json

with open('seoul_street_lights.json') as data_file:    
    base_data = json.load(data_file)

fc = FeatureCollection(
    [Feature(geometry=Point((f['POSITIONY'], f['POSITIONX'])), 
          id=f['LIGHTCD'], 
          properties={"BusinName": f['BUSINAME'], "RoadLineName": f['ROADLINENAME'], 
                      "SpeedLimit": f['SPEEDLIMIT']})
                      for f in base_data['DATA'] if f['POSITIONX'] < 90 and f['POSITIONX'] > -90]
    )

dumpped = geojson.dumps(fc)

with open('seoul_street_light.geojson', 'w') as target_geojson:
    target_geojson.write(dumpped)


# "DESCRIPTION" : {
#    "LAT":"위도","ADDRESS":"주소","LNG":"경도",
#    "AWS_CDE":"관측소코드","MEAN_05":"평균기온","NAM":"관측소명","OBJECTID":"고유번호"},
#
# {"LAT":"37.4528634","ADDRESS":"서울특별시 관악구 신림동 산56-1 (서울대학교)","LNG":"126.9502188","AWS_CDE":509,"MEAN_05":10.939155,"NAM":"관악","OBJECTID":1},
from geojson import Feature, Point, FeatureCollection
import geojson
import json

with open('seoul_temperature_2005.json') as data_file:    
    base_data = json.load(data_file)

fc =  FeatureCollection(
    [Feature(geometry=Point( (float(f['LNG']), float(f['LAT'])) ), 
          id=int(f['OBJECTID']), 
          properties={"AWS_CDE": f['AWS_CDE'], "NAM": f['NAM'], "MEAN_05": f['MEAN_05']})
                      for f in base_data['DATA'] if float(f['LAT']) < 90 and float(f['LAT']) > -90]
    )

dumpped = geojson.dumps(fc)

with open('seoul_temperature_2005.geojson', 'w') as target_geojson:
    target_geojson.write(dumpped)

