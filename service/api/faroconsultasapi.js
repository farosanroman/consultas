exports.register = function (api) {      
       
        //Trae Requeridos, Asignados y Vancantes agrupados por NodoFuncional o Rol
        api.get('getconsultasvacantes', getconsultasvacantes);
        // Nodo Funcional y Roles Pivoteados
        api.get('getconsultasfuncionalrol', getconsultasfuncionalrol);
        api.get('xo', xo);
             
};

function xo (request, response){
   //https://farodosconsultas2015.azure-mobile.net/api/faroconsultasapi/xo?squery=select top 1 * from persona 
   //var query= request.body.query;
   var sql1= '"'+request.query.squery+'"'
      console.log(sql1 );  
   var sql= "[farodosnodos2015].[xo] 'e' " 
   console.log(sql );      
    executewithoutparam(request,sql, response);
    //response.send(200, sql);
    
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