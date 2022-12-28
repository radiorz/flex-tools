/**
 * 
 * 移除满足条件的节点
 * 
 * 
 * removeTreeNodes({
 *    id:1,
 *    children
 * 
 * })
 * 
 */

import type { TreeNode, TreeNodeOptions } from "./types";
import { DefaultTreeOptions } from "./consts";
import { forEachTree, IForEachTreeCallback } from "./forEachTree";
import { ABORT } from "../object";

export interface RemoveTreeNodes extends TreeNodeOptions {

}

export function removeTreeNodes<Node extends TreeNode>(treeObj:Node | Node[],matcher:IForEachTreeCallback<Node>,options?:RemoveTreeNodes):void{
    const opts= Object.assign({}, DefaultTreeOptions ,options || {}) as Required<RemoveTreeNodes>   
    const {childrenKey='children', idKey='id'} = opts
    forEachTree<Node>(treeObj,({node,level,parent,path,index})=>{
        const isMatched = matcher({node,level,parent,path,index})
        if(isMatched){
            if(parent){
                if(Array.isArray(parent[childrenKey])){
                    const children = parent[childrenKey]
                    let index = children.findIndex((item: Node)=>node[idKey]==item[idKey])
                    if(index>-1) children.splice(index,1)
                }
            }else{ // 如果parent==null则需要删除清空对象
                Object.keys(node).forEach(key=>{
                    delete node[key]
                })
            }
        }else if(isMatched == ABORT){
            return ABORT
        }
    },opts) 
}
 