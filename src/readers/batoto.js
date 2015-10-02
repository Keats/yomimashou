import BaseReader from "./base";

import {
  getTextContent,
  getHref,
  getImageSource,
  getSelectContent,
 } from "../utils";


class Batoto extends BaseReader {
  constructor(url, site) {
    super(url, site);

    this.container = document.getElementById("comic_wrap");
    this.imgSelector = "#comic_page";
  }

  getRootUrl() {
    this.rootUrl = getHref(".moderation_bar li a");
  }

  getName() {
    this.name = getTextContent(".moderation_bar li");
  }

  getChapters() {
    // last to first
    const result = getSelectContent("select[name='chapter_select']");
    this.chapters = result.options;
    this.currentChapter = result.currentlySelected;
  }

  getCover() {
    if (!this.rootUrl) {
      return;
    }

    this.cover = fetch(this.rootUrl)
      .then(response => {
        return response.text();
      })
      .then(body => {
        const div = document.createElement("div");
        div.innerHTML = body;
        return getImageSource(div, ".ipsBox img");
      });
  }

  _cleanup() {
    // Try to keep the ads
    this.container.removeChild(this.container.firstElementChild);
    this.container.removeChild(this.container.firstElementChild);

    const content = document.getElementById("content");
    content.style.background = "black";
    // 2 navigation bars to remove
    content.querySelectorAll(".moderation_bar")[0].remove();
    content.querySelectorAll(".moderation_bar")[0].remove();
  }

  loadImages() {
    // first to last
    const result = getSelectContent("select[name='page_select']");
    this._cleanup();

    this.fetchAndInsertImages(result.options);
  }
}

export default Batoto;
