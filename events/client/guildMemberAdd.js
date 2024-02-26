    const Canvas = require("canvas")
    const { MessageAttachment } = require('discord.js')
    const { resolve } = require("path");
    
        Canvas.registerFont(resolve("assest/fonts/theboldfont.ttf"), { family: "Bold" });
        const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
        // Declare un tamaño base de la fuente
        let fontSize = 40;
        do {
        // Asignar la fuente al contexto y disminuirla para que se pueda medir nuevamente
        ctx.font = `${fontSize -= 1}px Bold`
        // Compare el ancho de píxel del texto con el lienzo menos el tamaño aproximado del avatar
        } while (ctx.measureText(text).width > canvas.width - 640);
        // Devuelve el resultado para usarlo en el lienzo real
        return ctx.font;
        };
    
    module.exports = async (client, member) => {
        const canvas = Canvas.createCanvas(890,422)
        const ctx = canvas.getContext("2d")
        
        //Background
        //You can use a direct link to the wallpaper
        const background = await Canvas.loadImage("assest/images/bienvenida.png")
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        
        // member.user.username.substr(0, 18);
        // Nombre de Usuario
        let username = member.user.username.substr(0, 18);
        ctx.font = applyText(canvas, username);// 18
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = "center"
        ctx.textBaselin = "hanging"
        ctx.fillText(username, 480,390);
    
        // Numero de Discriminator
        ctx.font = "40px Bold" // Font text
        ctx.fillStyle = "#fff" // Color tittle
        ctx.textAlign = "center"
        ctx.textBaselin = "hanging"
        ctx.fillText(`#${member.user.discriminator}`, 765, 390)
    
        const y= 192, radio= 110, x=canvas.width/7.2-radio
       
        //Borde Avatar
        ctx.beginPath()
        ctx.arc(x+radio, y+radio, radio +6, 0, Math.PI * 2, true)
        ctx.fillStyle = "#8700FF" // #101010 // Color Border
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        
        
        //Circulo cortado avatar
        ctx.save()
        ctx.beginPath()
        ctx.arc(x+radio, y+radio, radio, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.clip()
    
        //Avatar
        const imagen = await Canvas.loadImage(member.user.displayAvatarURL({dynamic: false, size:256, format:"png"}))
    
        ctx.drawImage(imagen, x, y, radio*2, radio*2)
        ctx.restore()
    
        // size 256
        //Estado
        /*
        ctx.beginPath()
        ctx.arc(230, 300, 30, 0, Math.PI*2, true)
        ctx.closePath()
        ctx.fillStyle= estado[member.presence.status]
        ctx.fill()
        ctx.lineWidth=2
        ctx.stroke() */
        
        const attach = new MessageAttachment(canvas.toBuffer(),"welcome.png")
       
    
       
        member.guild.channels.cache.get("1188854846569332768").send(`Bienvenido al Servidor ${member.toString()}`, attach);

    
    }
