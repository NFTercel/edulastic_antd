# Graph Component

###Question Types

####Graphing 
Filename: GraphQuadrants
####Graphing in the 1st quadrant
Filename: GraphQuadrants
####Number line with plot
Filename: AxisSegments
####Number line with drag & drop
Filename: AxisLabels

View Structure:
- AxisLabels
- GraphDisplay
  - AxisLabelsContainer
- AxisLabelsOptions
  - AxisLabelsMoreOptions
  
Builder for AxisLabels
- makeNumberlineAxis()
- updateGraphParameters()
- updateGraphSettings()
- renderMarks()

Builder for "Rendering Base" setting
- Mark.snapMark()
- NumberLine.onHandler()
- utils.calcRoundedToTicksDistance()

TicksDistance in Builder
- Nummberline.onHandler()
- Mark:
  - rerenderMark()
  - snapMark()
- utils:
  - calcRoundedToTicksDistance()
  - updateNumberline()
