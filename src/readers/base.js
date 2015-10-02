require("whatwg-fetch");

import {
  getImageSource,
 } from "../utils";


class BaseReader {
  constructor(url, site) {
    this.url = url;
    this.site = site;
    this.container = document.getElementById("comic_wrap");
    this.imgSelector = "";

    // This will be filled later on by enhance
    this.rootUrl = "";
    this.chapters = [];
    this.images = [];
    this.name = "";
    this.cover = null;
    this.currentChapter = 0;
  }

  getRootUrl() {
    throw new Error("NotImplemented");
  }

  getCover() {
    throw new Error("NotImplemented");
  }

  getName() {
    throw new Error("NotImplemented");
  }

  getChapters() {
    throw new Error("NotImplemented");
  }

  getCover() {
    throw new Error("NotImplemented");
  }

  loadImages() {
    throw new Error("NotImplemented");
  }

  fetchAndInsertImages(pages) {
    const panels = document.createElement("div");
    this.container.appendChild(panels);
    panels.id = "panels";

    pages.map(page => {
      const img = document.createElement("img");
      img.className = "yomi-panel";
      panels.appendChild(img);

      fetch(page.value)
        .then(response => {
          return response.text();
        })
        .then(body => {
          const div = document.createElement("div");
          div.innerHTML = body;
          const src = getImageSource(div, this.imgSelector);

          img.src = src;
          img.onerror = () => {
            img.title = "Reload?";
            // set a reload icon
            img.onclick = () => {
              img.src = src;
            };
          };
        });
    });
  }

  enhance() {
    this.getName();
    this.getRootUrl();
    this.getChapters();
    this.getCover();
    this.loadImages();
  }
}

export default BaseReader;
