/** @type {import('@bacons/apple-targets').Config} */
module.exports = {
  type: "widget",
  colors: {
    $accent: "#F09458",
    $widgetBackground: "#DB739C",
  },
  entitlements: {
    "com.apple.security.application-groups": ["group.cr2024im.data"],
  },
  "deploymentTarget": "17.0"
};