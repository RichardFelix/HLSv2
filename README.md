#HLSv2
#This is a rewrite testbed for HLS library

#What is used for?
HLS which stands for Histogram, Bar, Line and Scatter charts. HLS API is created to be a easy to use library for data analysis. Our goal is to see the correlations between your data in a easy to read and useful way. HLS API will create visualization in following statistics charts: scatter charts, histogram plots, line charts. 


#Tools and Technology used
For Data visualization, we are using AngularJS, JavaScript, HTML5 and CSS. HLS emphasis on efficient manipulation of your data. It supports large data sets and dynamic behaviors. We will use composite filter effect on different charts.



#Installation
HLS will need three files to run which will need to be linked into the html. First is the AngularJS app file name HLSapp.js . Second is the CSS file that formats the charts x and y axis called hls.css . The last file is the AngularJS library js which can be found at this site www.angularJS.org .  The standard template of the code is shown below.


	<head>		
		<title> </title>
		<script type="text/javascript" src ="AngularJSfileLocation"></script>
		<link rel="stylesheet" href="css/hls.css">

	</head>

	<body>
		<script type = "text/javascript" src = "js/HLSapp.js"> </script>

		<script type="text/javascript">

			//...HLS code goes here
			
		</script>

	</body>


 

# Compatibility 
HLS will only work with .json files.	
HLS can run on multiple updated browsers full list is below. 
 
 Browser
Internet    Explorer 
Firefox 
Chrome 
Safari 
Opera 
IOS Safari 
Opera
 Mini 
Android Browser 
Chrome  Android 
Version
9+ 
31+ 
31+ 
7+ 
29+ 
7.1+ 
8+ 
4.4+ 
42+ 


#Functionality
This API includes functions to:
Browse, select and import the input file.
Functions to display various kinds of graphical representations.
This API follows the best practices like similar naming conventions, similar styling and color conventions.


#User Functions
lineChart( String filePath [, int Xcolumn, [int Ycolumn], int width, int height, boolean tickview, boolean logview] )	
	-Will draw a line chart with the given data file		
	-Optional Xcolumn and Ycolumn axis array which are the columns of the data of your choice		
   	    -If no Xcolumn and Ycolumn axis array are not given HLS will use the two first columns	
	-Optional width and height can be chosen by user	
            -if null or no width and height are chosen then HLS will use your browser width and height	
        -Optional tickview toggle false to toggle the view on and true for off	
            -if no tickview value is given then HLS will have it toggle off by default	
        -Optional logview toggle false to toggle the view off and true for on	
            -if no logview value is given then HLS will have it toggle off by default

scatterChart( String filePath [, int Xcolumn, [int Ycolumn], int width, int height, boolean tickview, boolean logview] )	
	-Will draw a scatter chart with the given data file		
	-Optional Xcolumn and Ycolumn axis array which are the columns of the data of your choice			
        	-If no Xcolumn and Ycolumn axis array are not given HLS will use the two first columns			
	-Optional width and height can be chosen by user	
                -if null or no width and height are chosen then HLS will use your browser width and height	
        -Optional tickview toggle false to toggle the view on and true for off	
                -if no tickview value is given then HLS will have it toggle off by default 	
        -Optional logview toggle false to toggle the view off and true for on	
            -if no logview value is given then HLS will have it toggle off by default                

histogram( String filePath [, int Xcolumn, [int Ycolumn], int width, int height, boolean tickview, boolean logview])	
	-Will draw a histogram chart with the given data file		
	-Optional Xcolumn and Ycolumn axis array which are the columns of the data of your choice		
        	-If no Xcolumn and Ycolumn axis array are not given HLS will use the two first columns	
	-Optional width and height can be chosen by user	
                -if null or no width and height are chosen then HLS will use your browser width and height	
        -Optional tickview toggle false to toggle the view on and true for off	
                -if no tickview value is given then HLS will have it toggle off by default 	
        -Optional logview toggle false to toggle the view off and true for on	
            -if no logview value is given then HLS will have it toggle off by default                
               
stackChart( String filePath [, int Xcolumn, [int Ycolumn], int width, int height, boolean tickview, boolean logview])	
	-Will draw a bar chart with the given data file		
	-Optional Xcolumn and Ycolumn axis array which are the columns of the data of your choice		
        	-If no Xcolumn and Ycolumn axis array are not given HLS will use the two first columns	
	-Optional width and height can be chosen by user	
                -if null or no width and height are chosen then HLS will use your browser width and height	
        -Optional tickview toggle false to toggle the view on and true for off	
                -if no tickview value is given then HLS will have it toggle off by default 		
        -Optional logview toggle false to toggle the view off and true for on	
            -if no logview value is given then HLS will have it toggle off by default                






