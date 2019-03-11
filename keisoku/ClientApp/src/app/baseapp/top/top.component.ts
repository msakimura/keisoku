import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})

export class TopComponent implements OnInit {
  cards = [
    { title: 'ひび割れ抽出', cols: 1, rows: 1, image: 'https://keisokuaccount.blob.core.windows.net/tunnel/mimm.jpg', content: '' },
    { title: 'ひび割れ抽出', cols: 2, rows: 1, image:'https://keisokuaccount.blob.core.windows.net/tunnel/mimm.jpg', content:'' },
    { title: 'ひび割れ幅分類', cols: 2, rows: 1, image: 'https://keisokuaccount.blob.core.windows.net/tunnel/プレビュー.jpg', content: '' },
    { title: 'その他変状抽出', cols: 2, rows: 1, image: 'https://keisokuaccount.blob.core.windows.net/tunnel/抽出.jpg', content: ''},
  ];

  constructor() { }

  ngOnInit() {
  }

}
