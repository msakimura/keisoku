import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})

export class TopComponent implements OnInit {
  cards = [
    { title: '関門トンネル計測開始', cols: 1, rows: 1, image:'https://keisokuaccount.blob.core.windows.net/tunnel/mimm.jpg', content:'ひび割れ抽出のダウンロードが可能になりました。' },
    { title: '新機能リリース', cols: 1, rows: 1, image: 'https://keisokuaccount.blob.core.windows.net/tunnel/プレビュー.jpg', content: 'プレビュー機能が使えるようになりました。' },
    { title: '最新AI搭載', cols: 1, rows: 1, image: 'https://keisokuaccount.blob.core.windows.net/tunnel/抽出.jpg', content: 'ひび割れ抽出率が向上しました。'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
