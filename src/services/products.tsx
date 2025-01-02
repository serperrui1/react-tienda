
const BASE_URL = "https://fakestoreapi.com/"

export function getProductos(){
    return fetch(BASE_URL+"products").then((response) => response.json());
}
export function getProductoById(id:number){
    return fetch(BASE_URL+"products/"+id).then((response) => response.json());
}
export function getAllCategorias(){
    return fetch(BASE_URL+'products/categories').then(res=>res.json())
}
export function getAllProductosByCategoria(categoria:string){
    return fetch(BASE_URL+'products/category/'+categoria).then(res=>res.json())
}
