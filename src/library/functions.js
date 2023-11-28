exports.getErrorFromCoreOrDb = (arr) => {
    
    let msg = "";
    if(arr){
        //origin = 'CORE' => Possibly some data is missing in the body
        //origin = 'DB'   => The error is caused by the Database when it is validating Primary and unique keys
        if(arr[0].origin === 'CORE'){
            let message = []
            message.push('The following information is not present in the api body: ');
            for(e in arr){
                message.push(arr[e].path)
            }
            msg = JSON.stringify(message).replaceAll('"', '');
            msg = msg.replaceAll(' ,', ' ');
            msg = msg.replaceAll(',', ', ');
            msg = msg.replace('[', '');
            msg = msg.replace(']', '');

        }else{
            msg = arr[0].message;
        }
    }
    console.log('Errores jonier: ', msg);
    return msg;

}