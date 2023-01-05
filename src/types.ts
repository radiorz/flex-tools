export type Class = new (...args: any[]) => any

// 提取数组成员的类型
export type ArrayMember<T> = T extends (infer T)[] ? T : never

export type AsyncFunction = (...args: any[]) => Awaited<Promise<any>>;
// 提取函数的第1个参数
export type FirstArgument<T> = T extends (...args: any) => any ? Parameters<T>[0] : any;
// 提取函数的第2个参数
export type SecondArgument<T> = T extends (...args: any) => any ? Parameters<T>[1] : any;
// 提取函数的返回值类型
export type ReturnValueType<T> = T extends (...args: any) => any ? ReturnType<T> : any;

// 允许为空
export type AllowEmpty<T> = T | null | undefined
// 构造类
export type Constructor = { new (...args: any[]): any };

// 装饰器
export type TypedClassDecorator<T> = <T extends Constructor>(target: T) => T | void; 

// 指定返回类型的函数
export type WithReturnFunction<T> = (...args: any)=>T

// 实现某个指定的类接口
export type ImplementOf<T> = new (...args: any) => T

/**
 * 用来更名接口中的的类型
 */
export type Rename<T,NameMaps extends Partial<Record<keyof T,any>>> = {
    [K in keyof NameMaps as NameMaps[K] ]:K extends keyof T ? T[K] : never
} & Omit<T,keyof NameMaps>

 

declare global {
    interface String {
        params(params: Record<string, any>): string;
        params(...args: any[]): string;
        params(args: any[]): string;
        rjust(width:number,fillChar:string):string
        ljust(width:number,fillChar:string):string
        firstUpper(): string;
        center(width: number, fillChar?: string): string;
        trimBeginChars(chars: string,atBegin?:boolean): string
        trimEndChars(chars: string,atEnd?:boolean): string 
    }
}