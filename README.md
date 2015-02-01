# canvas-chart

## Author: Justin Bennett

###Description:
I completed this as a submission for an assignment in my Cross-Platform Application Development course.  We were 
tasked with creating a couple of graphs in an HTML5 canvas tag using our javascript chops.  It was a challenging assignment  because it required translating each data value into a portion of the pie and then processing the data again in order to account for hi-density displays.

###How it Works:
1. A javascript data object is dynamically loaded.  
2. Pie Graph:
      - Loop through each data element,
      - determine starting and ending angles to draw,
      - run condition to check for smallest or biggest value, (change radius value)
      - place leader for captions in the middle of section,
      - place caption at end of leader
1. Bar Graph:
      - Draw axis and grid lines,
      - determine bar and spacing sizes, (equally spaced based on number of records)
      - draw bars & labels,



