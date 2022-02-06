import React from 'react'
import './styles.css'
import io from 'socket.io-client'

class Board extends React.Component {
    timeout;
    color;
    //socket = io.connect("http://localhost:5000")
    ws = new WebSocket("ws://localhost:8082");
    constructor(props) {
        super(props)
        console.log(props)
        this.color = props.color
        // this.socket.on('canvas-data', (data) => {
        //     var image = new Image()
        //     var canvas = document.querySelector('#board');
        //     var ctx = canvas.getContext('2d')
        //     image.onload = () => {
        //         ctx.drawImage(image, 0, 0)
        //     };
        //     image.src = data
        // })

        this.ws.addEventListener('message', (data) => {
            
            console.log('data', data.data);
           // xouturl = URL.createObjectURL(data.data);
            try {
                var image = new Image()
                var canvas = document.querySelector('#board');
                var ctx = canvas.getContext('2d')
                image.onload = () => {
                    ctx.drawImage(image, 0, 0)
                };
                data.data.text().then(url => 
                    image.src = url
                );
            } catch(err) {
                console.log('err', err);
            }
        })

    }

    componentDidMount() {
        this.drawOnCanvas()
    }

    render() {
        return (
            <div className='sketch' id = 'sketch'>
                <canvas className='board' id='board'></canvas>
            </div>
        )
    }

    drawOnCanvas() {
        var canvas = document.querySelector('#board');
        var ctx = canvas.getContext('2d');

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        var mouse = { x: 0, y: 0 };
        var last_mouse = { x: 0, y: 0 };

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function (e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);


        /* Drawing on Paint App */
        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        canvas.addEventListener('mousedown', function (e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function () {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);
        const root = this;
        var onPaint = function () {
            ctx.strokeStyle = root.props.color;
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();
            if (root.timeout !== undefined) clearTimeout(root.timeout)
            root.timeout = setTimeout(()=> {
                //root.socket.emit('canvas-data', base64Image)
                try {
                    //console.log(JSON.stringify(canvas))
                    const base64Image = canvas.toDataURL("image/png")
                    root.ws.send(base64Image)
                } catch(err) {
                    console.log('err', err);
                }
            }, 1000)
        };
    }
}

export default Board