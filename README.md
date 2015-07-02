#HLS 

#What is used for?
HLS which stands for Histogram, Bar, Line and Scatter charts. HLS API is created to be a easy to use library for data analysis. Our goal is to see the correlations between your data in a easy to read and useful way. HLS API will create visualization in following statistics charts: scatter charts, histogram plots, line charts, and bar charts. 


#Tools and Technology used
For Data visualization, we are using AngularJS, JavaScript, HTML5 and CSS. HLS emphasis on efficient manipulation of your data. It supports large data sets and dynamic behaviors. We will use composite filter effect on different charts. HLS will have SVG animations that will run for 1.5s when the chart is refreshed.

#ScreenShots
![Alt text](https://github.com/RichardFelix/HLSv2/raw/master/Pics/linechartV2.PNG "Line Chart")
![Alt text](https://github.com/RichardFelix/HLSv2/raw/master/Pics/scatterV2.PNG "Scatter Chart")
![Alt text](https://github.com/RichardFelix/HLSv2/raw/master/Pics/stackChart.PNG "Stack Chart A.K.A. Histogram")
![Alt text](https://github.com/RichardFelix/HLSv2/raw/master/Pics/barchartv2.PNG "Bar Chart")		
		
#Installation
HLS will need three files to run which will need to be linked into the html. First is the AngularJS app file name HLSapp.js . Second is the CSS file that formats the charts x and y axis called hls.css . The last file is the AngularJS library js which can be found at this site www.angularJS.org .  The standard template of the code is shown below.


	<head>		
		<title> </title>
		<script type="text/javascript" src ="AngularJSfileLocation"></script>
	       	<link rel="stylesheet" href="css/hls.css">	
		<script type = "text/javascript" src = "js/HLSapp.js"> </script>
                <script type = "text/javascript" src ="js/factory/dataFactory.js"></script>
                <script type = "text/javascript" src = "js/HLSfunctions.js"></script>
                <script type = "text/javascript" src = "js/HLSwrapper.js"> </script>

	</head>

	<body>
		<script type="text/javascript">

			//...HLS code goes here
			
		</script>

	</body>



# Compatibility 
HLS will only work with .json files.	
HLS can run on multiple updated browsers full list is below. 

Internet    Explorer  9+    
Firefox   31+   
Chrome    31+   
Safari     7+   
Opera     29+   
IOS Safari    7.1+  
Opera      8+   
 Mini     
Android Browser     4.4+    
Chrome  Android    42+      

#Functionality
This API includes functions to:
Browse, select and import the input file.
Functions to display various kinds of graphical representations.
This API follows the best practices like similar naming conventions, similar styling and color conventions.


#User Functions
lineChart( String filePath [, int Xcolumn, [int Ycolumn], int width, int height, string theme, boolean logview] )	
	-Will draw a line chart with the given data file		
	-Optional Xcolumn and Ycolumn axis array which are the columns of the data of your choice		
   	    -If no Xcolumn, it will use the first column.	
   	    -If no Ycolumn, it will use all other columns except Xcolumn.	
	-Optional width and height can be chosen by user	
            -if null or no width and height are chosen then HLS will use your browser width and height	
        -Optional theme can be chosen from these three choices ( 'dark', 'light', 'neon')	
            -if no theme is chosen HLS will color it with the default array of colors	
        -Optional logview toggle false to toggle the view off and true for on	
            -if no logview value is given then HLS will have it toggle off by default

scatterChart( String filePath [, int Xcolumn, [int Ycolumn], int width, int height, string theme, boolean logview] )	
	-Will draw a scatter chart with the given data file		
	-Optional Xcolumn and Ycolumn axis array which are the columns of the data of your choice			
   	    -If no Xcolumn, it will use the first column.	
   	    -If no Ycolumn, it will use all other columns except Xcolumn.	
	-Optional width and height can be chosen by user	
            -if null or no width and height are chosen then HLS will use your browser width and height	
        -Optional theme can be chosen from these three choices ( 'dark', 'light', 'neon')	
            -if no theme is chosen HLS will color it with the default array of colors		                
        -Optional logview toggle false to toggle the view off and true for on	
            -if no logview value is given then HLS will have it toggle off by default                

barChart( String filePath [, int Xcolumn, [int Ycolumn], int width, int height, string theme])	
	-Will draw a histogram chart with the given data file		
	-Optional Xcolumn and Ycolumn axis array which are the columns of the data of your choice		
            -If no Xcolumn, it will use the first column.	
   	    -If no Ycolumn, it will use all other columns except Xcolumn.	
	-Optional width and height can be chosen by user	
                -if null or no width and height are chosen then HLS will use your browser width and height	
        -Optional theme can be chosen from these three choices ( 'dark', 'light', 'neon')	
            -if no theme is chosen HLS will color it with the default array of colors	       		
               
stackChart( String filePath [, int Xcolumn, [int Ycolumn], int width, int height, string theme])	
	-Will draw a bar chart with the given data file		
	-Optional Xcolumn and Ycolumn axis array which are the columns of the data of your choice		
            -If no Xcolumn, it will use the first column.	
   	    -If no Ycolumn, it will use all other columns except Xcolumn.	
	-Optional width and height can be chosen by user	
                -if null or no width and height are chosen then HLS will use your browser width and height		
        -Optional theme can be chosen from these three choices ( 'dark', 'light', 'neon')	
            -if no theme is chosen HLS will color it with the default array of colors		

chartObject.setTheme( String theme )	
        -Will change theme for your chart object		
        -Themes choices are ( 'dark', 'light', 'neon ) also null can be used to change chart back to default theme

#Sample Code	
This code made the screenshots above very easy to use, Enjoy.	

        <script type = "text/javascript" src = "js/HLSapp.js"> </script>
        <script type = "text/javascript" src ="js/factory/dataFactory.js"></script>
        <script type = "text/javascript" src = "js/HLSfunctions.js"></script>
        <script type = "text/javascript" src = "js/HLSwrapper.js"> </script>

	<script type="text/javascript">

	    //...HLS code goes here

            var chart4 = new scatterChart('data/test.json');
            chart4.setTheme(null);
            
            var chart3 = new barChart('data/test.json',0,[1,2,3]);
            chart3.setTheme('dark');
            
            var chart = new stackChart('data/test.json',0,[1,2,3]);
            chart.setTheme('light');
            
            var chart2 = new lineChart('data/test.json',0,[1,2,3]);
            chart2.setTheme('neon');

	</script>






