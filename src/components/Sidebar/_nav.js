export default {
  version: 'V 0.0.3',
  items: [
    // {
    //   name: 'Dashboard',
    //   url: '/dashboard',
    //   icon: 'icon-speedometer',
    //   badge: {
    //     variant: 'warning',
    //     text: 'BETA'
    //   }
    // },
    {
      title: true,
      name: 'Views',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Content',
      url: '/contentbot',
      icon: 'icon-layers'
    }
  ]
};
