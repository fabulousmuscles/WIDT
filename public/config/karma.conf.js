module.exports = function(config){
  config.set({ 
    basePath : '../',

    files : [
      'libs/angular/angular.js',
      'libs/angular-mocks/angular-mocks.js',
      'libs/angular-resource/angular-resource.js',
      'js/**/*.js',
      'test/unit/**/*.js'
    ],
  
    exclude : [
      'libs/angular/*.min.js',     
    ],

    autoWatch : true,          

    frameworks: ['jasmine'],
  
    browsers : ['PhantomJS'],

    plugins : [
            'karma-junit-reporter',         
            'karma-chrome-launcher',        
            'karma-firefox-launcher',       
            'karma-phantomjs-launcher',
            'karma-script-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};

