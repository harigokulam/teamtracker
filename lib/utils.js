export var Util = (function() {
    return {
        csvToJson: function (csv) {
            console.log('csvToJson');
            
            if (csv == undefined) return null;
            
            var lines=csv.split("\n");

            var result = [];
            //read line one - this will have all the titles
            var firstLine = lines[0];
            firstLine=firstLine.replace(/\s/g, "");
            var headers=firstLine.split(",");

            for(var i=1;i<lines.length;i++){

                var obj = {};
                /*var line = lines[i].replace("(.*?)", function(s){
                    return s.replace(/,/g, '_');
                });*/
                
                var line = lines[i].replace(/"[^"]+"/g, function (match) {
                    return match.replace(/,/g, '_');
                });
                
                console.log(line);
                
                var currentline= line.split(",");

                for(var j=0;j<headers.length;j++){
                    obj[headers[j]] = currentline[j];
                }

                result.push(obj);

            }
  
            //return result; //JavaScript object
            return JSON.stringify(result); //JSON
        }  
    };
})();

