# 🎮 SimpleCraft - An Addictive AI Game

A fun and addictive browser-based voxel building game inspired by Minecraft. Build, explore, and survive in a simple pixelated world!

## ✨ Features

- **🏗️ Block Building System**: Place and break different types of blocks (Wood, Stone, Grass, Gold, Red)
- **🌍 Procedural World Generation**: Dynamic terrain with floating islands and varied landscapes
- **👤 Player Character**: Control your avatar with smooth movement and exploration
- **❤️ Health & Hunger System**: Manage your resources to survive the game world
- **🌅 Day/Night Cycle**: Dynamic lighting effects that change the atmosphere
- **✨ Particle Effects**: Visual feedback with particle bursts when building and breaking blocks
- **📦 Inventory System**: Collect and manage blocks in real-time
- **🎮 Smooth Controls**: Intuitive keyboard and mouse controls optimized for gameplay
- **🎯 Crosshair Targeting**: Precise block selection and placement

## 🎮 How to Play

### Getting Started

1. Open `index.html` in a web browser (Chrome, Firefox, Safari, or Edge)
2. Start building and exploring immediately - no installation needed!

### Controls

- **Arrow Keys / WASD**: Move around the world
- **Mouse**: Aim and look around (the crosshair shows your target)
- **Left Click**: Break blocks and collect them
- **Right Click**: Place blocks from your inventory
- **Space**: Jump action
- **Number Keys (1-5)**: Quick select block types

### Game Mechanics

1. **Breaking Blocks**: 
   - Click on any block to break it
   - Collected blocks appear in your inventory counter
   - Break blocks strategically to create pathways

2. **Placing Blocks**: 
   - Right-click in empty spaces to place blocks
   - Use your collected blocks to build structures
   - Each block placement costs 1 from your inventory

3. **Health System**: 
   - Health decreases when you're hungry
   - Keep your hunger bar high to maintain health
   - Losing all health triggers a game reset

4. **Hunger System**: 
   - Hunger decreases as you move around
   - The more active you are, the hungrier you get
   - Low hunger (below 30%) causes health to drain
   - Manage your activity to survive longer

5. **Block Types**:
   - 🪵 **Wood** (#8B7355) - Common, good for building
   - 🪨 **Stone** (#A9A9A9) - Durable, solid structure
   - 🌱 **Grass** (#90EE90) - Natural terrain
   - ⭐ **Gold** (#FFD700) - Rare, valuable blocks
   - 🔴 **Red** (#FF6347) - Decorative block for creativity

## 🎨 Game Features In Detail

### Addictive Gameplay Loop

1. **Explore** the procedurally generated world
2. **Collect** blocks from the environment
3. **Build** amazing structures with your imagination
4. **Survive** by managing health and hunger
5. **Repeat** - the gameplay loop keeps you engaged!

### Progression

- Start with zero blocks in inventory
- Break natural blocks to begin collecting resources
- Build shelters and structures as your block count grows
- Create increasingly complex designs as you gather more materials
- Challenge yourself to build specific designs or structures

### Visual Feedback

- **Particle Effects**: Colorful particles burst when breaking blocks
- **Day/Night Cycle**: Sky darkens and lightens over time
- **Health/Hunger Bars**: Real-time status indicators
- **Block Counter**: See how many blocks you've collected
- **Crosshair**: Precise aiming for block placement

## 🚀 Getting Started

### Prerequisites
- A modern web browser (works on desktop, tablet, and mobile)
- No installation or setup required!

### Quick Start

**Option 1: Local File**
```bash
# Simply open the file in your browser
open index.html

# Or right-click and select "Open with Browser"
```

**Option 2: Local Server (Recommended)**
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Then visit: http://localhost:8000
```

**Option 3: Online**
- Deploy to GitHub Pages, Netlify, or any web hosting
- Share the link with friends to play

## 📁 Project Structure

```
SimpleCraft/
├── index.html       # Main game interface
├── styles.css       # Game styling and layout
├── game.js          # Core game logic and mechanics
└── README.md        # This file!
```

## 🔧 Technical Details

### Architecture

- **Canvas-based Rendering**: Uses HTML5 Canvas 2D API for smooth graphics
- **Grid-based World**: 2D top-down voxel-style block system
- **Real-time Game Loop**: 60 FPS gameplay for smooth performance
- **Event-driven Input**: Responsive keyboard and mouse controls
- **Procedural Generation**: Perlin-like noise for varied terrain

### Performance

- Optimized rendering: Only draws visible blocks
- Efficient particle system with automatic cleanup
- Smooth camera following system
- Responsive UI updates
- Works on most devices including mobile browsers

## 🎯 Design Philosophy

SimpleCraft was designed to be:
- **Simple**: Easy to learn, hard to master
- **Addictive**: Quick gameplay sessions that encourage "one more round"
- **Accessible**: No complex UI or controls to learn
- **Fun**: Creative building with immediate visual feedback
- **Lightweight**: Runs smoothly without heavy requirements

## 🌟 Tips for Beginners

1. **Start Collecting**: Break blocks from the natural terrain first
2. **Build a Home Base**: Create a simple shelter as your first project
3. **Manage Resources**: Don't build too fast or you'll run out of blocks
4. **Stay Mobile**: Moving around burns hunger quickly - balance activity
5. **Use Block Colors**: Create pixel art and patterns with different block types
6. **Explore**: Find the floating islands for unique materials
7. **Build Tall**: Stack blocks upward for interesting vertical structures

## 🎮 Gameplay Strategies

### Survival Mode
- Focus on building shelter first
- Maintain a healthy block supply
- Monitor your hunger and health regularly
- Explore systematically to find all block types

### Creative Mode
- Ignore hunger and health mechanics
- Focus purely on building and creating
- Experiment with different structures
- Create pixel art and designs

### Challenge Run
- Set yourself goals (build something specific)
- Time yourself to add pressure
- Try to reach a certain block count
- See how high you can build

## 🐛 Known Limitations

- 2D top-down view (simplified from 3D Minecraft)
- Single-player only
- No save/load system (progress resets on refresh)
- World is finite but large
- No mobs or enemies (pure building focus)

## 🚀 Future Enhancement Ideas

Potential features that could be added:
- **Crafting System**: Combine blocks to create new items
- **More Block Types**: 20+ different blocks with unique properties
- **Underground Caves**: Underground exploration and mining
- **Water & Lava**: Liquid physics and interaction
- **Enemies/Mobs**: Creatures to fight or avoid
- **Multiplayer**: Play with friends online
- **Save System**: Save and load your creations
- **Sound Effects**: Audio feedback for actions
- **Achievements**: Unlock badges and rewards
- **Mobile Touch Controls**: Optimized for mobile devices
- **3D Mode**: First-person or third-person perspective
- **Seasons**: Different weather and environmental changes

## 💡 Customization

You can easily customize the game:

### Change Block Colors
Edit the `BLOCKS` object in `game.js`:
```javascript
const BLOCKS = {
    1: { name: 'Wood', color: '#8B7355' }, // Change this color
    // ...
}
```

### Adjust Difficulty
Modify these values in `game.js`:
- `hunger -= 0.05` - Controls hunger drain during movement
- `gameState.player.health -= 0.1` - Controls health damage when hungry

### Change World Size
Edit these constants:
- `WORLD_WIDTH` - Width of the game world
- `WORLD_HEIGHT` - Height of the game world
- `BLOCK_SIZE` - Size of each block in pixels

## 📝 License

This project is completely open source and free to use, modify, and distribute!

## 🙏 Credits

Created as an addictive, simple building game inspired by Minecraft and voxel-based games.

## 🎓 Learning Resources

This project demonstrates:
- HTML5 Canvas rendering
- Game loops and frame-based animation
- Event handling and input systems
- Procedural generation
- Game state management
- Particle systems
- UI/UX design for games

Perfect for learning game development concepts!

## 💬 Feedback & Support

Have fun playing SimpleCraft! 🎮✨

---

**Happy Building! 🏗️**

Start your SimpleCraft adventure now and see what amazing structures you can create!
