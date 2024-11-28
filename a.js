var ts=timestamp // string timestamp in second from UNIX Era
var rawTemp = data.substring(0, 4)
var rawHum = data.substring(4, 6)
var temp = ((parseInt(rawTemp, 16)) / 10.0) - 40.0
var hum = parseInt(rawHum, 16)
result.add(
      new ChannelData(eui, "temperature", temp, ts)
);
result.add(
      new ChannelData(eui, "humidity", hum, ts)
);
result.add(
      new ChannelData(eui, "seqNumber", seqNumber, ts)
);
// lost variables: device, deviceTypeId - it is ok




// Add ignorable variables in this array.
payload = payload.filter(x => !ignore_vars.includes(x.variable));
const payload_raw = payload.find(x => x.variable === "data")?.["value"];

if (payload_raw) {
    try {

        var serie = payload.find(x => x.variable === "data")["serie"]; //payload.data;

        var rawTemp = payload_raw.substring(0, 4)
        var rawHum = payload_raw.substring(4, 6)
        var temp = ((parseInt(rawTemp, 16)) / 10.0) - 40.0
        var hum = parseInt(rawHum, 16)

        payload.push({
            "variable": "humidity",
            "value": hum,
            "serie": serie,
            "unit": "%"
        });

        payload.push({
            "variable": "temperature",
            "value": temp,
            "serie": serie,
            "unit": "°C"
        });

    } catch (e) {
        // Print the error to the Live Inspector.
        console.error(e);

        // Return the variable parse_error for debugging.
        payload = [{ variable: 'parse_error', value: e.message }];
    }
}


///////////////////////
var ts=timestamp
var temp0=((payload[0]/2)-39)
var hum0=(payload[1]*2)
var carb0=(payload[2]*10)
result.add(
      new ChannelData(eui, "temperature", temp0, ts)
);
result.add(
      new ChannelData(eui, "humidity", hum0, ts)
);
result.add(
      new ChannelData(eui, "co2", carb0, ts)
);


//try{
//    var ts=Date.now()
//    // funkcje pomocnicze
//    var tc2b=function(c0,c1)
//    {
//        return c0 + (c1*256);
//    }
//    var byte2temperature=function(b)
//    {
//        return (((b*1.0)/2.0) - 39.0);
//    }
//    var byte2humidity=function(b)
//    {
//        return ((b*1.0)* 2.0);
//    }
//    var byte2co2=function(b)
//    {
//        return ((b*1.0) *10.0);
//    }
//    // przygotowanie czasu
//    var t0 = new Date(timestamp);
//    
//    var temp0 = byte2temperature(tc2b(payload[0],payload[1]));
//    var hum0 = byte2humidity(tc2b(payload[2],payload[3]));
//    var carb0 = byte2co2(tc2b(payload[4],payload[5]));
//    
//    
//    var ts=Date.now()
//    result.add(
//      new ChannelData(eui, "temperature", temp0, ts)
//    );
//    result.add(
//      new ChannelData(eui, "humidity", hum0, ts)
//    );
//    result.add(
//      new ChannelData(eui, "co2", carb0, ts)
//    );
//    result.add(
//      new ChannelData(eui, "b0", 0, Date.now())
//    );
//    }catch(err){
//    result.add(
//      new ChannelData(eui, "b0", 1, Date.now())
//    );
//    }