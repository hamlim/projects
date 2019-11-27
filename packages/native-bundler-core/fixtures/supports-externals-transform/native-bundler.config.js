async function transformExternalAsset(body) {
  return new Promise(function promise(resolve) {
    let temp = body.replace(
      /require\('[a-z]+'\)/,
      "await import('https://mh-unumd.glitch.me/@matthamlin/danger-react-suspense/dev/react.js?exports=named')",
    )
    temp = temp.replace(/\(function \(/g, '(async function (')
    resolve(temp)
  })
}

module.exports = function(cfg) {
  return {
    ...cfg,
    config: { transformExternalAsset },
  }
}
