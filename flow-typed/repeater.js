declare module '@antongolub/repeater' {
  declare type IAny = any

  declare type IHandler = (...args: any) => any
  declare type ILimit = number

  declare type IOpts = {
    target: IHandler,
    delay: number,
    context?: ?IAny,
    limit?: ?ILimit
  }

  declare type ITarget = IHandler | IOpts

  declare type IRepeater = {
    (...args: any): any;
    target: IHandler,
    timeout: TimeoutID,
    limit?: ?ILimit,
    delay?: ?number,
    args?: ?Array<IAny>,
    context?: ?IAny
  }

  declare type ILibrary = (target: ITarget, delay: number, context: ?IAny, limit?: ?ILimit) => IRepeater
  
  declare module.exports: ILibrary
}