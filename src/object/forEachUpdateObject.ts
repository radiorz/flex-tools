import { isPlainObject } from "../typecheck/isPlainObject"

/**
 * 深度遍历对象成员,当值满足条件时,调用updater函数的返回值来更新值
 
 * let data ={a:1,b:2,l:[1,2,3],c:"xx"}
 * forEachUpdateObject(data,(value,parent,keyOrIndex)=>{
 *      return value.toUpperCase
 * },(value,parent,keyOrIndex)=>{
 *     return typeof(value)=="string"
 * })
 * 
 * @param {*} obj 
 * @param {*} updater(value,parent,keyOrIndex)   返回值用来替换目标值
 * @param {*} filter(value,parent,keyOrIndex)    可选的过滤函数，只有返回值=true的项才会进行更新
 *         当指定该函数时,会在调用updater时先调用此函数,如果返回true则更新,否则不更新
 * @returns 
 */
export type IForEachCallback = ({value,parent,keyOrIndex}:{value?:any,parent?:any[] | object | null,keyOrIndex?:string | number | null})=>any
    
export function forEachUpdateObject<T=any>(obj:any[] | object,filter:IForEachCallback,updater:IForEachCallback):T{
    let isAbort :boolean = false
    function forEachUpdateItem(parent:any[] | object | null,keyOrIndex:string | number | null,value:any){
        if(Array.isArray(value)){
            for(let i=0;i<value.length;i++){
                value[i] = forEachUpdateItem(value,i,value[i])
            }
            return value
        }else if(isPlainObject(value)){
            for(let [k,v] of Object.entries(value)){
                value[k] = forEachUpdateItem(value,k,v)
            }
            return value
        }else{
            if(typeof(filter)=='function'){
                if(filter({value,parent,keyOrIndex})){
                    return updater({value,parent,keyOrIndex})
                }else{
                    return value
                }
            }else{
                return updater({value,parent,keyOrIndex})
            }
        }
    }
    forEachUpdateItem(null,null,obj)
    return obj as T
}

