import api_key from '../../api_key.js';
import {Component, Input, OnInit} from '@angular/core';

declare const clipchamp;

@Component({
    // selector: 'clipchamp-btn',
    templateUrl: './clipchamp.component.html',
    styleUrls: ['./clipchamp.component.css']
})
export class ClipchampBtn implements OnInit {
    @Input()
    public label = 'Upload with Clipchamp!';

    @Input()
    public size = 'medium';

    @Input()
    public title = 'Ye\' olde video-upload shoppe';

    @Input()
    public output = 'dummy';

    @Input()
    public input

    private clipchamp: any;

    onClick() {
        // this.clipchamp.open();
        console.log(this.label);
    }

    injectScript() {
        const script = document.createElement('script');
        script.onload = function () {
            this.clipchamp = clipchamp({
                label: this.label
            });
        }.bind(this);
        script.src = `https://api.clipchamp.com/${api_key}/button.js`;
        script.type = 'text/javascript';
        document.head.appendChild(script); // or something of the likes
    }

    ngOnInit() {
        console.log(this);
        console.log('123123123', this.label);

        document.onreadystatechange = function (e) {
            if (document.readyState === 'complete') {
                this.injectScript();
            }
        }.bind(this);
    }
}
