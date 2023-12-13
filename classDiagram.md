# Image
```mermaid
classDiagram
class ImgVal {
+ src : string
+ new ImgVal(src)
}

class ImgValMain {
+ color : string
+ grp : string
+ src : string
+ new ImgValMain(src, grp, color)
}

ImgValMain <|-- ImgValGrp

class ImgValColor {
+ color : string
+ grp : string
+ src : string
+ new ImgValColor(src, grp, color)
}

ImgValColor <|-- ImgValGrp

class ImgValGrp {
+ grp : string
+ src : string
+ new ImgValGrp(src, grp)
}

ImgValGrp <|-- ImgVal
```






# Item

```mermaid
classDiagram
class Item {
+ Item(cssId)
+ getCssId()
+ getDisplayStatus()
+ getSrc()
+ setDisplay(flag)
+ setDisplayImage()
+ setImgVal(val)
}


class GrpItem  {
+ setAction(makeupManager)
}

Item <|-- GrpItem

class MainItem  {
+ getGrp()
+ getSeason()
}

Item <|-- MainItem

class ColorItem {
func :function
+ setAction(makeupManager)
}


Item <|-- ColorItem
```
