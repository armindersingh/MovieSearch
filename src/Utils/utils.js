function utils(){
    return {
        fetchResult : async function(url) {
            let response;
            try{
                response = await fetch(url);
            } catch(err) {
                return {type : 'error', message : err};
            }
            if (response.ok) { 
                let json = await response.json();
                return json;
            } else {
                return {type : 'error', message : response.status};
            }
        }
    }
}

function singleton() {
    let instanceOfUtils;
    return {
        getSingletonUtilsObject : function() {
            if(!instanceOfUtils) {
                instanceOfUtils = new utils();
            }
            return instanceOfUtils;
        }
    }
}

let single = singleton();
export default single.getSingletonUtilsObject();

