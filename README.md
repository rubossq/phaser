# phaser
Game samples using phaser js

At first all it is my point of view on gamedev using JS + Phaser.io + Cocoon. 
It is not a template how to create games using phaser but you can get some approaches from this projects. 


There are 2 projects which have been created using javascript Phaser.io library:

# Ballz
Ballz is simple bricks breaker game.

# Startype
Startype is simple type game with space ship instead of words.

Each of this game has some set of resources:
- images, sprites (for animations)
- fonts (ttf and image fonts)
- sounds (preffer ogg format)
- json files for animations

Each page and dialog of game has it own manager and sets of files.

Libraries:
- base.js
- phaser.js

After game was created it was builded with cocoon.js (canvas+) for android and ios.
Some notes:
- android works good 4.4+ versions
- ios seems to be laggy with good images quality (low fps around 30)
- there might be problems with sounds in different formats (thats why all sound is in .ogg format)

Conclusion:
- using javascript for creating games is very cool, BUT it seems that it is not optimized enought yet to make something playeble without deep optimization (was not real found for me)
If you like js and wanna create games using it - try Unity for it (but really I recommend use C# instead of js if you wanna do something cool not so hard)




