export default function ({ $http, $config }, inject) {
  // Setup the HTTP object
  const $flickr = $http.create({})
  $flickr.setBaseURL($config.FLK_BASE_URL)

  // Inject to the context
  inject('flickr', $flickr)

  // Some debug
  $flickr.onRequest((config) => {
    // eslint-disable-next-line no-console
    console.log('Making request to ' + config.url)
  })
}
