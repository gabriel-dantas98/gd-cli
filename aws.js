const AWS = require('aws-sdk');
const commander = require('commander');
const util = require('util');
const _ = require('lodash');

let ec2 = new AWS.EC2({ region: 'us-east-1' });

ec2.describeInstances((err, data) => {
    if (err) console.log(err);

    result = data.Reservations
    listAdd = Object.keys(result[0].Instances[0])
    //console.log(listAdd);
    listAttrCamelCase = listAdd.map(attr => _.camelCase(attr));
    //console.log(listAttrCamelCase);

    for(let i =0; i < listAdd.length; i++){
        console.log("this." + listAttrCamelCase[i] + " = " + "instance." + listAdd[i]);
    }
})
