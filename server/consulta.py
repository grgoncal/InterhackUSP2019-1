import requests
import xmltodict, json
import paho.mqtt.client as mqtt

url = "https://uspdigital.usp.br/mercurioweb/PatrimonioMostrar"
payload = {'numpat':'055.015934','saida' : '1'}

#print(reqst.text)
def on_connect(mqttc, obj, flags, rc):
    pass

def on_message(mqttc, obj, msg):
    patr = str(msg.payload.decode("utf-8"))
    print(patr)
    patr = patr[:3] + '.' + patr[3:]
    #print(patr)
    payload = {'numpat':patr,'saida' : '1'}
    reqst = requests.post(url,params=payload)
    dictJson = xmltodict.parse(reqst.text)
    json.dumps(dictJson)
    dictJson = dictJson['ai.patrimonio.PatrimonioBean']
    dictJson = translate_JSON(dictJson,patr)
    dictJson = json.dumps(dictJson)
    #print(dictJson['ai.patrimonio.PatrimonioBean']['Nompes'])
    mqttc.publish("app/add",str(dictJson))


def on_publish(mqttc, obj, mid):
    pass

def on_subscribe(mqttc, obj, mid, granted_qos):
    pass

def translate_JSON(dictJson,patr):
    #print(dictJson)
    newJson = {}
    newJson['brand'] = dictJson['Epfmarpat']
    newJson['complement'] = dictJson['Epflgr']
    newJson['date'] = dictJson['Datadoc']
    newJson['doc'] = dictJson['Nomdocumento']
    newJson['location'] = dictJson['Sglcendsp'] + '-' + dictJson['Nomcendsp']
    newJson['material'] = dictJson['Coditmmat'] + '-' + dictJson['Nomsgpitmmat']
    newJson['model'] = dictJson['Modpat']
    newJson['number'] = dictJson['Numdocinppat']
    newJson['origin'] = dictJson['Epforibem']
    newJson['owner'] = dictJson['Nompes']
    newJson['patrimony'] = patr
    newJson['property-id'] = dictJson['Codbem']
    newJson['status'] = dictJson['Stabem']
    newJson['supplier'] = dictJson['Razaosocial']
    newJson['type'] = dictJson['Tippat']
    newJson['unit'] = dictJson['Codunddsp'] + '-' + dictJson['Nomunddsp']
    newJson['usage'] = dictJson['Tiputl']
    newJson['warranty'] = str(dictJson['Przgarpat']) + ' ' + str(dictJson['Descricao'])


    return newJson


    

mqttc = mqtt.Client()
mqttc.username_pw_set("MQTT USER","MQTT PWD")
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_publish = on_publish
mqttc.on_subscribe = on_subscribe
mqttc.connect("MQTT IP", 1883, 60)
mqttc.subscribe("app/out", 0)

mqttc.loop_forever()
