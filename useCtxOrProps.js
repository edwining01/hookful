
var useContext = require('react').useContext
var _ = require('lodash')

var PROPS_PATH_KEY = `propsPath`
var CTX_PATH_KEY = `ctxPath`

/**
 * Load context first, then context props.
 * Important: Expect Context defaultValue equal to undefined.
 * 
 * eg.
 *  - useCtxOrProps(SomeContext, props)
 *  - useCtxOrProps(SomeContext, props, pathOptions, defaultValue)
 * 
 * @param  {Context} Context
 * @param  {Any} props
 * @param  {String | Object} pathOptions
 * @param  {Any} defaultValue
 *   String  Path for both ctx and props
 *   Object
 *    - ctxPath  Path for ctx only
 *    - propsPath  Path for props only
 * @return {Any}         Result of Ctx value or props after resolve.
 */
module.exports = function useCtxOrProps(
  Context, props, pathOptions, defaultValue) {
  const ctx = useContext(Context)
  const mode = _.isUndefined(ctx)
  
  if(_.isNil(pathOptions)) return mode? props: ctx
  const path = _.isString(pathOptions)?
    pathOptions: pathOptions[mode? PROPS_PATH_KEY: CTX_PATH_KEY]
  return _.get(ctx, path, defaultValue)
}
