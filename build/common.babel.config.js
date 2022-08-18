module.exports = {
  plugins: [
    [
      'import',
    
      {
        libraryName: '@perfma/heaven',
        libraryDirectory: 'es',
        style: true,
        customStyleName: (name) => `@perfma/heaven/es/${name}`,
      },
    ]
  ]
}