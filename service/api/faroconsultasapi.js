exports.register = function (api) {      
       
        //Trae Requeridos, Asignados y Vancantes agrupados por NodoFuncional o Rol
        api.get('getconsultasvacantes', getconsultasvacantes);
        // Nodo Funcional y Roles Pivoteados
        api.get('getconsultasfuncionalrol', getconsultasfuncionalrol);
        api.get('xo', xo);
             
};

function xo (request, response){
   //https://farodosconsultas2015.azure-mobile.net/api/faroconsultasapi/xo?caso=1&qry=0018&p1=0&p2=0&p3=0&p4=0&p5=0
   var param1= parseInt(request.query.caso); 
   var param2= request.query.qry; 
   var param3= request.query.p1; 
   var param4= request.query.p2; 
   var param5= request.query.p3; 
   var param6= request.query.p4; 
   var param7= request.query.p5;  
   //var sql= "select  top 1000 * from persona"     
   var params=[param1, param2, param3, param4, param5, param6, param7];
   var sql= "EXEC [farodosconsultas2015].[xo] @caso=?, @qry=?, @p1=?, @p2=?, @p3=?, @p4=?, @p5=?" ;      
   //console.log(sql);      
   execute(request, sql, params, response);       
};

function getconsultasfuncionalrol(request, response){

        //https://farodosconsultas2015.azure-mobile.net/api/faroconsultasapi/getconsultasfuncionalrol?idorganizacion=10&idnodoorganizacional=2
        var param1 = parseInt(request.query.idorganizacion);
        var param2 = parseInt(request.query.idnodoorganizacional);        

        var params=[param1,param2];
        
        var sql = "EXEC [farodosconsultas2015].[FaroConsultasFuncionalRol] @IdOrganizacion=?, @IdNodoOrganizacional = ? ";
              
        execute(request, sql, params, response);  
};

function getconsultasvacantes(request, response){

        //https://farodosconsultas2015.azure-mobile.net/api/faroconsultasapi/getconsultasvacantes?idorganizacion=10&idnodoorganizacional=2&conrol=0
        var param1 = parseInt(request.query.idorganizacion);
        var param2 = parseInt(request.query.idnodoorganizacional);
        var param3 = parseInt(request.query.conrol);

        var params=[param1,param2,param3];
        
        var sql = "EXEC [farodosconsultas2015].[FaroConsultasVacantes] @IdOrganizacion=? ,@IdNodoOrganizacional = ?, @ConRol= ? ";
        execute(request, sql, params, response);  
};
    
function executewithoutparam(request,sql, response){
       var mssql = request.service.mssql;
        mssql.query(sql, {
        success: function(results) {   
                                   
                response.send(200, JSON.stringify(results))  
                
        }, error: function(err) {
                response.send(400, { error: err });        
        }
        
       }) 
};

function execute(request, sql, params, response){        
       var mssql = request.service.mssql;
        mssql.query(sql, params, {
        success: function(results) {                          
                response.send(200, JSON.stringify(results))                
        }, 
        error: function(err) {
                response.send(400, { error: err });        
        }        
       })
};