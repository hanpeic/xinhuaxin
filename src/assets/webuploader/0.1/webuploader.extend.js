(function(b) {
    var a = function(p, k) {
      var s = b.extend(true, {}, b.fn.webuploader.defaults, p)
        , z = s.id
        , g = ""
        , q = s.uploadType == "image"
        , K = b("#" + z + "Uploader")
        , C = K.find("#" + z + "fileLists");
      var t = function(O, Q) {
        if (O) {
          s.i18n = s.i18n || {};
          var P = s.i18n[O];
          if (!(P && P != "")) {
            P = O
          }
          if (Q) {
            for (var M = 1; M < arguments.length; M++) {
              var N = new RegExp("\\{" + (M - 1) + "\\}","gm");
              P = P.replace(N, arguments[M])
            }
          }
          return P
        }
        return O
      };
      if (q) {
        C.appendTo(K.find(".queueList"))
      }
      var l = K.find(".statusBar")
        , d = l.find(".info")
        , x = K.find(".uploadBtn")
        , n = K.find(".placeholder")
        , G = l.find(".progress").hide()
        , y = 0
        , m = 0
        , E = window.devicePixelRatio || 1
        , A = 110 * E
        , r = 110 * E
        , L = "pedding"
        , h = {}
        , j = (function() {
          var M;
          try {
            M = navigator.plugins["Shockwave Flash"];
            M = M.description
          } catch (N) {
            try {
              M = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")
            } catch (O) {
              M = "0.0"
            }
          }
          M = M.match(/\d+/g);
          return parseFloat(M[0] + "." + M[1], 10)
        }
      )()
        , B = (function() {
          var M = document.createElement("p").style
            , N = "transition"in M || "WebkitTransition"in M || "MozTransition"in M || "msTransition"in M || "OTransition"in M;
          M = null;
          return N
        }
      )()
        , J = []
        , v = []
        , w = []
        , F = [];
      if (WebUploader.browser.ie && !WebUploader.Uploader.support("flash")) {
        if (j) {
          (function(M) {
              window.expressinstallcallback = function(P) {
                switch (P) {
                  case "Download.Cancelled":
                    alert(t("安装失败！"));
                    break;
                  case "Download.Failed":
                    alert(t("安装失败！"));
                    break;
                  default:
                    alert(t("安装已成功，请刷新！"));
                    break
                }
                delete window.expressinstallcallback
              }
              ;
              var O = ctxStatic + "/webuploader/0.1/expressInstall.swf";
              var N = '<object type="application/x-shockwave-flash" data="' + O + '" ';
              if (WebUploader.browser.ie) {
                N += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '
              }
              N += 'width="100%" height="100%" style="outline:0"><param name="movie" value="' + O + '" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>';
              M.html(N)
            }
          )(K)
        } else {
          K.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>')
        }
        return
      } else {
        if (!WebUploader.Uploader.support()) {
          js.showMessage(t("文件上传组件不支持您的浏览器，请使用高版本浏览器！"));
          return
        }
      }
      var p = {
        disableGlobalDnd: true,
        swf: ctxStatic + "/webuploader/0.1/Uploader.swf",
        server: s.service.upload,
        id: z,
        imageFlag: q,
        formData: {
          bizKey: s.bizKey,
          bizType: s.bizType,
          uploadType: s.uploadType,
          imageMaxWidth: s.imageMaxWidth,
          imageMaxHeight: s.imageMaxHeight,
          chunkSize: s.chunkSize,
          __ajax: "json"
        },
        chunked: s.chunked,
        chunkSize: s.chunkSize,
        threads: s.threads,
        fileNumLimit: s.maxUploadNum,
        fileSingleSizeLimit: s.maxFileSize,
        compress: {
          width: s.imageMaxWidth,
          height: s.imageMaxHeight
        }
      };
      b.each(s.extendParams, function(M, N) {
        p.formData["extend[" + M + "]"] = N
      });
      if (!s.readonly) {
        p = b.extend(true, {}, {
          pick: {
            id: "#" + z + "filePicker",
            label: t("点击选择文件"),
            multiple: s.maxUploadNum > 1
          },
          dnd: "#" + z + "Uploader .queueList",
          paste: "#" + z + "Uploader .queueList"
        }, p);
        if (s.uploadType == "image") {
          p.pick.label = t("点击选择图片");
          if(s.useCapture) {
            p.pick.capture = 'camera';
          }
          p.accept = {
            title: "Images",
            extensions: s.imageAllowSuffixes.replace(/\./g, ""),
            mimeTypes: "image/*"
          }
        } else {
          if (s.uploadType == "media") {
            p.pick.label = t("点击选择视频");
            if(s.useCapture) {
              p.pick.capture = 'camcorder';
            }
            p.accept = {
              title: "Medias",
              extensions: s.mediaAllowSuffixes.replace(/\./g, ""),
              mimeTypes: "video/*"
            }
          } else {
            if (s.uploadType == "file") {
              p.accept = {
                title: "Files",
                extensions: s.fileAllowSuffixes.replace(/\./g, ""),
                mimeTypes: "*/*"
              }
            } else {
              p.accept = {
                title: "All",
                extensions: (s.imageAllowSuffixes + "," + s.mediaAllowSuffixes + "," + s.fileAllowSuffixes).replace(/\./g, ""),
                mimeTypes: "*/*"
              }
            }
          }
        }
      }
      var H = WebUploader.create(p);
      if (!window.webuploader) {
        window.webuploader = []
      }
      window.webuploader.push(H);
      k.uploader = H;
      k.options = s;
      if (!window.webuploaderRefresh) {
        window.webuploaderRefresh = function() {
          setTimeout(function() {
            if (!window.webuploader) {
              window.webuploader = []
            }
            for (var M in window.webuploader) {
              window.webuploader[M].refresh()
            }
          }, 200)
        }
      }
      H.on("dndAccept", function(O) {
        var N = false
          , M = O.length
          , P = 0
          , Q = "text/plain;application/javascript ";
        for (; P < M; P++) {
          if (~Q.indexOf(O[P].type)) {
            N = true;
            break
          }
        }
        return !N
      });
      var my_capture = '';
      if(s.useCapture) {
        if (s.uploadType == "media") {
          my_capture = 'camcorder';
        }
        if (s.uploadType == "image") {
          my_capture = 'camera';
        }
      }
      H.addButton({
        id: "#" + z + "filePicker2",
        label: t("继续添加"),
        capture: my_capture
      });
      if (!s.isLazy) {
        x.hide()
      }
      function D(O, M, P) {
        if (s.bizType != "") {
          J.push(O);
          b("#" + z).val(J.join(",")).change();
          try {
            b("#" + z).resetValid()
          } catch (N) {}
        }
        if (s.returnPath) {
          w.push(M);
          F.push(P);
          b("#" + s.filePathInputId).val(w.join("|")).change();
          b("#" + s.fileNameInputId).val(F.join("|")).change();
          try {
            b("#" + s.filePathInputId).resetValid()
          } catch (N) {}
          try {
            b("#" + s.fileNameInputId).resetValid()
          } catch (N) {}
        }
      }
      function u(M) {
        if (s.bizType != "") {
          J = [];
          M.each(function() {
            J.push(b(this).attr("fileUploadId"))
          });
          b("#" + z).val(J.join(",")).change();
          try {
            b("#" + z).resetValid()
          } catch (N) {}
        }
        if (s.returnPath) {
          w = [];
          F = [];
          M.each(function() {
            w.push(b(this).attr("fileUrl"));
            F.push(b(this).attr("fileName"))
          });
          b("#" + s.filePathInputId).val(w.join("|")).change();
          b("#" + s.fileNameInputId).val(F.join("|")).change();
          try {
            b("#" + s.filePathInputId).resetValid()
          } catch (N) {}
          try {
            b("#" + s.fileNameInputId).resetValid()
          } catch (N) {}
        }
      }
      function e(O) {
        var P = O.attr("fileUploadId");
        if (P && P != null) {
          if (s.bizType != "") {
            J.splice(b.inArray(P, J), 1);
            v.push(P);
            b("#" + z).val(J.join(","));
            b("#" + z + "__del").val(v.join(","));
            try {
              b("#" + z).resetValid()
            } catch (N) {}
            try {
              b("#" + z + "__del").resetValid()
            } catch (N) {}
          }
          if (s.returnPath) {
            var M = O.attr("fileUrl");
            var Q = O.attr("fileName");
            w.splice(b.inArray(M, w), 1);
            F.splice(b.inArray(Q, F), 1);
            b("#" + s.filePathInputId).val(w.join("|"));
            b("#" + s.fileNameInputId).val(F.join("|"));
            try {
              b("#" + s.filePathInputId).resetValid()
            } catch (N) {}
            try {
              b("#" + s.fileNameInputId).resetValid()
            } catch (N) {}
          }
        }
      }
      function o() {
        var N = ""
          , M = H.getStats();
        if (L === "confirm" && M.uploadFailNum) {
          N = M.uploadFailNum + t(q ? "张图片" : "个文件") + t("上传失败") + ', <a class="retry" href="#">' + t("重新上传") + "</a>" + t("或") + '<a class="ignore" href="#">' + t("忽略") + "</a>"
        } else {
          if (L === "confirm" || L === "ready") {
            N = t("总共") + y + t(q ? "张图片" : "个文件") + (m <= 0 ? "" : "（" + WebUploader.formatSize(m) + "）")
          } else {
            N = t("已上传") + y + t(q ? "张图片" : "个文件") + (m <= 0 ? "" : "（" + WebUploader.formatSize(m) + "）");
            if (M.uploadFailNum) {
              N += ", " + t("失败{0}个", M.uploadFailNum)
            }
          }
        }
        d.html(N);
        if (y < s.maxUploadNum) {
          b("#" + z + "filePicker2").show()
        } else {
          b("#" + z + "filePicker2").hide()
        }
        window.webuploaderRefresh()
      }
      function i() {
        var M = 0
          , P = 0
          , O = 0
          , N = G.children();
        b.each(h, function(R, Q) {
          O += Q[0];
          M += Q[0] * Q[1]
        });
        P = O ? M / O : 0;
        N.eq(0).text(Math.round(P * 100) + "%");
        N.eq(1).css("width", Math.round(P * 100) + "%");
        o()
      }
      H.on("uploadProgress", function(N, M) {
        var O;
        if (q) {
          O = b("#" + z + N.id),
            $percent = O.find(".progress span");
          $percent.css("width", M * 100 + "%")
        } else {
          O = b("#" + z + N.id).find(".prog_bar"),
            $percent = O.find(".progress-bar");
          $percent.css("width", Math.round(M * 100) + "%");
          $percent.text(Math.round(M * 100) + "%")
        }
        if (typeof h[N.id] == "undefined") {
          h[N.id] = [N.size, 0]
        }
        h[N.id][1] = M;
        i()
      });
      function I(O) {
        var N, M;
        if (O === L) {
          return
        }
        x.removeClass("state-" + L);
        x.addClass("state-" + O);
        L = O;
        switch (L) {
          case "pedding":
            n.removeClass("element-invisible");
            C.hide();
            l.addClass("element-invisible");
            break;
          case "ready":
            n.addClass("element-invisible");
            b("#" + z + "filePicker2").removeClass("element-invisible");
            C.show();
            l.removeClass("element-invisible");
            break;
          case "uploading":
            b("#" + z + "filePicker2").addClass("element-invisible");
            G.show();
            x.text(t("暂停上传"));
            break;
          case "paused":
            G.show();
            x.text(t("继续上传"));
            break;
          case "confirm":
            G.hide();
            b("#" + z + "filePicker2").removeClass("element-invisible");
            x.text(t("开始上传"));
            M = H.getStats();
            if (M.successNum && !M.uploadFailNum) {
              I("finish");
              return
            }
            break;
          case "finish":
            M = H.getStats();
            if (M.successNum) {} else {
              L = "done"
            }
            break
        }
        o()
      }
      function f(M, N) {
        var O = "";
        switch (N) {
          case "exceed_size":
            O = t("文件大小超出");
            break;
          case "interrupt":
            O = t("文件传输中断");
            break;
          case "http":
            O = t("HTTP请求错误");
            break;
          case "not_allow_type":
            O = t("文件格式不允许");
            break;
          default:
            O = t("上传失败，请重试");
            break
        }
        if (O != null) {
          if (q) {
            M.text(O)
          } else {
            M.html('<span class="label label-sm label-danger">' + O + "</span>")
          }
        }
      }
      H.on("beforeFileQueued", function(M) {
        if (y >= s.maxUploadNum) {
          js.showMessage(t("您只能上传{0}个文件", s.maxUploadNum));
          return false
        }
      });
      H.on("fileQueued", function(Q) {
        y++;
        m += Q.size;
        if (y === 1 && !s.readonly) {
          l.show()
        }
        if (q) {
          var R = b('<li id="' + z + Q.id + '"><p class="title">' + Q.name + '</p><p class="imgWrap"></p><p class="progress"><span></span></p><p class="error"></p><div class="file-panel"><span class="cancel">' + t("删除") + "</span></div></li>")
            , O = R.find("div.file-panel")
            , N = R.find("p.progress-bar")
            , M = R.find("p.imgWrap")
            , P = R.find("p.error");
          if (Q.getStatus() === "invalid") {
            f(P, Q.statusText)
          } else {
            P.text(t("等待上传"));
            M.text(t("预览生成中"));
            H.makeThumb(Q, function(T, U) {
              if (T) {
                M.text(t("不能预览"));
                return
              }
              var S = b('<img src="' + U + '">');
              M.empty().append(S)
            }, A, r);
            h[Q.id] = [Q.size, 0];
            Q.rotation = 0
          }
          Q.on("statuschange", function(T, S) {
            if (S === "progress") {
              N.hide().width(0)
            }
            if (T === "error" || T === "invalid") {
              f(P, Q.statusText);
              h[Q.id][1] = 1
            } else {
              if (T === "interrupt") {
                f(P, "interrupt")
              } else {
                if (T === "queued") {
                  h[Q.id][1] = 0
                } else {
                  if (T === "progress") {
                    P.text(t("正在上传") + "...");
                    N.css("display", "block")
                  }
                }
              }
            }
            R.removeClass("state-" + S).addClass("state-" + T)
          });
          R.on("mouseenter", function() {
            O.stop().animate({
              height: 30
            })
          });
          R.on("mouseleave", function() {
            O.stop().animate({
              height: 0
            })
          });
          O.on("click", "span", function() {
            var U = b(this);
            switch (U.index()) {
              case 0:
                var S = b(this);
                js.confirm(t("确定删除该图片吗？"), function(V) {
                  e(S);
                  H.removeFile(Q)
                });
                return;
              case 1:
                Q.rotation += 90;
                break;
              case 2:
                Q.rotation -= 90;
                break
            }
            if (B) {
              var T = "rotate(" + Q.rotation + "deg)";
              M.css({
                "-webkit-transform": T,
                "-mos-transform": T,
                "-o-transform": T,
                transform: T
              })
            } else {
              M.css("filter", "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + (~~((Q.rotation / 90) % 4 + 4) % 4) + ")")
            }
          });
          R.appendTo(C)
        } else {
          var R = b('<tr id="' + z + Q.id + '" class="template-upload"><td class="name"><i class="fa fa-file-text-o"></i>' + Q.name + '</td><td class="size">' + WebUploader.formatSize(Q.size) + '</td><td class="prog_bar"><p class="progress"><span class="progress-bar">0%</span></p></td><td class="msg"></td><td class="btncancel"><a class="btn btn-default btn-xs yellow"><i class="fa fa-ban"></i> ' + t("删除") + " </a></td></tr>")
            , O = R.find("td.btncancel")
            , N = R.find("td.progress-bar")
            , P = R.find("td.msg");
          if (Q.getStatus() === "invalid") {
            f(P, Q.statusText)
          } else {
            P.text(t("等待上传"));
            h[Q.id] = [Q.size, 0];
            Q.rotation = 0
          }
          Q.on("statuschange", function(T, S) {
            if (S === "progress") {}
            if (T === "error" || T === "invalid") {
              f(P, Q.statusText);
              h[Q.id][1] = 1;
              N.text("0%").css("width", "0%")
            } else {
              if (T === "interrupt") {
                f(P, "interrupt");
                N.text("0%").css("width", "0%")
              } else {
                if (T === "progress") {
                  P.text(t("正在上传") + "...");
                  N.css("display", "block")
                } else {
                  if (T === "complete") {}
                }
              }
            }
            R.removeClass("state-" + S).addClass("state-" + T)
          });
          O.on("click", "a", function() {
            var T = b(this);
            switch (T.index()) {
              case 0:
                var S = b(this);
                js.confirm(t("确定删除该文件吗？"), function(U) {
                  e(S);
                  H.removeFile(Q)
                });
                return
            }
          });
          R.appendTo(C)
        }
        I("ready");
        i();
        if (!s.isLazy) {
          H.upload()
        }
      });
      function c(M) {
        y--;
        if (!y) {
          I("pedding")
        }
        m -= M.size;
        delete h[M.id];
        i();
        if (q) {
          b("#" + z + M.id).off().find(".file-panel").off().end().remove()
        } else {
          b("#" + z + M.id).off().find(".btncancel").off().end().remove()
        }
      }
      H.on("fileDequeued", function(M) {
        c(M)
      });
      H.on("uploadAccept", function(S, M, Q) {
        var T = b("#" + z + S.file.id);
        try {
          var P = (M._raw || M)
            , N = JSON.parse(P);
          if (N.result == "false") {
            Q(N.code)
          }
          if (q) {
            b('<p class="error" title="' + N.message + '">' + N.message + "</p>").appendTo(T)
          } else {
            var O = (N.result == "true") ? "success" : "danger";
            T.find(".msg").html('<span class="label label-sm label-' + O + '" title="' + N.message + '">' + N.message + "</span>")
          }
        } catch (R) {
          if (q) {
            b('<p class="error">' + t("服务器返回出错") + "</p>").appendTo(T)
          } else {
            T.find(".msg").html('<span class="label label-sm label-danger">' + t("服务器返回出错") + "</span>")
          }
        }
      });
      H.on("uploadError", function(M, N) {
        if (M.fileUpload) {
          H.removeFile(M);
          k.refreshFileList([M.fileUpload], false)
        }
      });
      H.on("uploadComplete", function(file) {
        console.log(file);
        var downloadUrl = '';
        if(s.autoDownload) {
          if (file && file.fileUpload && file.fileUpload.status === '0') {
            downloadUrl = 'imgdownload://' + window.location.origin + s.service.download + file.fileUpload.id;
          } else if (file && file.statusText === '' && file.fileUploadId) {
            downloadUrl = 'imgdownload://' + window.location.origin + s.service.download + file.fileUploadId;
          }
          console.log(downloadUrl);
          if (downloadUrl) {
            var a = document.createElement('a');
            var event = new MouseEvent('click');
            a.href = downloadUrl;
            a.dispatchEvent(event);
          }
        }
      });
      H.on("uploadSuccess", function(M, Q) {
        var T = b("#" + z + M.id)
          , S = T.find(".progress-bar");
        try {
          var R = (Q._raw || Q)
            , O = JSON.parse(R);
          if (O.result == "true") {
            var U = O.fileUpload
              , V = (js.startWith(U.fileUrl, ctxPath) || js.startWith(U.fileUrl, "http://") || js.startWith(U.fileUrl, "https://") ? "" : ctxPath) + U.fileUrl
              , N = (s.returnPath ? V : s.service.download + U.id);
            if (q) {
              T.find(".file-panel .cancel").attr("fileUploadId", U.id).attr("fileUrl", V).attr("fileName", U.fileName).attr("fileSize", U.fileEntity.fileSize)
            } else {
              T.find(".btncancel").empty().append('<a class="btn btn-danger btn-xs delete" fileUploadId="' + U.id + '" fileUrl="' + V + '" fileName="' + U.fileName + '" fileSize="' + U.fileEntity.fileSize + '"><i class="fa fa-trash-o"></i> ' + t("删除") + "</a>")
            }
            D(U.id, V, U.fileName)
          } else {
            S.css("width", "0%").text("0%")
          }
        } catch (P) {
          S.css("width", "0%").text("0%");
          error(P)
        }
        o()
      });
      H.on("error", function(M) {
        var N = "";
        switch (M) {
          case "Q_TYPE_DENIED":
            N = t("文件类型不对");
            break;
          case "F_EXCEED_SIZE":
            N = t("文件大小超出");
            break;
          case "F_DUPLICATE":
            N = t("不要选择重复文件");
            break;
          case "Q_EXCEED_NUM_LIMIT":
            N = t("您只能上传{0}个文件", s.maxUploadNum);
            break;
          case "Q_EXCEED_SIZE_LIMIT":
            N = t("文件大小超出");
            break;
          default:
            N = t("上传失败，请重试");
            break
        }
        js.showMessage(N)
      });
      H.on("all", function(O, N) {
        var M;
        switch (O) {
          case "uploadFinished":
            I("confirm");
            break;
          case "startUpload":
            I("uploading");
            break;
          case "stopUpload":
            I("paused");
            break
        }
      });
      x.on("click", function() {
        if (b(this).hasClass("disabled")) {
          return false
        }
        if (L === "ready") {
          H.upload()
        } else {
          if (L === "paused") {
            H.upload()
          } else {
            if (L === "uploading") {
              H.stop()
            }
          }
        }
      });
      d.on("click", ".retry", function() {
        H.retry();
        return false
      });
      d.on("click", ".ignore", function() {
        var N, M, O = H.getFiles("error");
        for (M = 0; N = O[M++]; ) {
          H.removeFile(N)
        }
        I("finish");
        i();
        return false
      });
      if (C.sortable) {
        if (q) {
          C.sortable({
            connectWith: "li",
            handle: ".imgWrap img",
            placeholder: "sort-highlight",
            forcePlaceholderSize: true,
            zIndex: 999999,
            update: function(M, N) {
              u(C.find("li .file-panel .cancel"))
            }
          })
        } else {
          C.sortable({
            connectWith: "tr",
            handle: ".name i",
            placeholder: "sort-highlight",
            forcePlaceholderSize: true,
            zIndex: 999999,
            update: function(M, N) {
              u(C.find("tr .btncancel .delete"))
            }
          })
        }
      }
      if (q) {
        C.on("click", ".imgWrap img", function() {
          var N = b(this)
            , P = N.attr("src")
            , Q = "#outerdiv"
            , O = "#innerdiv"
            , M = "#bigimg";
          if (b(Q).length == 0) {
            b('<div id="outerdiv" style="position:fixed;top:0;left:0;background:rgba(0,0,0,0.7);z-index:99999;width:100%;height:100%;display:none;"><div id="innerdiv" style="position:fixed;"><img id="bigimg" style="border:2px solid #fff;" src="" /></div></div>').appendTo(document.body)
          }
          b(M).attr("src", P);
          b("<img/>").attr("src", P).on('load', function() {
            var R = b(window).width();
            var V = b(window).height();
            var Y = this.width;
            var U = this.height;
            var W, X, S = 0.8;
            if (U > V * S) {
              X = V * S;
              W = X / U * Y;
              if (W > R * S) {
                W = R * S
              }
            } else {
              if (Y > R * S) {
                W = R * S;
                X = W / Y * U
              } else {
                W = Y;
                X = U
              }
            }
            b(M).css("width", W);
            var Z = (R - W) / 2;
            var T = (V - X) / 2;
            b(O).css({
              top: T,
              left: Z
            });
            b(Q).fadeIn("fast")
          });
          b(Q).click(function() {
            b(this).fadeOut("fast")
          })
        })
      }
      k.refreshFileList = function(Q, N) {
        if (N) {
          C.empty();
          y = 0;
          m = 0;
          J = [];
          w = [];
          F = []
        }
        if (Q && Q.length > 0) {
          for (var P = 0; P < Q.length; P++) {
            var O = Q[P]
              , M = (js.startWith(O.fileUrl, ctxPath) || js.startWith(O.fileUrl, "http://") || js.startWith(O.fileUrl, "https://") ? "" : ctxPath) + O.fileUrl
              , R = (s.returnPath ? M : s.service.download + O.id);
            if (q) {
              //$li = b('<li id="' + O.id + '"><p class="title">' + O.fileName + '</p><p class="imgWrap"><img src="' + M + '"/></p><p class="progress"><span></span></p><div class="file-panel"><span class="cancel ' + (!s.readonly ? "" : "hide") + '" fileUploadId="' + O.id + '" fileUrl="' + M + '" fileName="' + O.fileName + '" fileSize="' + O.fileEntity.fileSize + '">' + t("删除") + "</span></div>" + (O.message ? O.message : "") + "</li>");
              $li = b('<li id="' + O.id + '"><p class="title"><a target="_blank" href="imgdownload://' + window.location.origin + R + '">' + O.fileName + '</a></p><p class="imgWrap"><img src="' + M + '"/></p><p class="progress"><span></span></p><div class="file-panel"><span class="cancel ' + (!s.readonly ? "" : "hide") + '" fileUploadId="' + O.id + '" fileUrl="' + M + '" fileName="' + O.fileName + '" fileSize="' + O.fileEntity.fileSize + '">' + t("删除") + "</span></div>" + (O.message ? O.message : "") + "</li>");
              $li.on("mouseenter", function() {
                var S = b(this).index();
                C.find(".file-panel").eq(S).stop().animate({
                  height: 30
                })
              });
              $li.on("mouseleave", function() {
                var S = b(this).index();
                C.find(".file-panel").eq(S).stop().animate({
                  height: 0
                })
              });
              $li.on("click", "span", function() {
                var W = b(this)
                  , X = b(this).closest("li")
                  , T = b(this).parent().data("fileRotation");
                if (!T) {
                  T = 0
                }
                switch (W.index()) {
                  case 0:
                    if (!s.readonly) {
                      var W = b(this);
                      js.confirm(t("确定删除该图片吗？"), function(Z) {
                        e(W);
                        if (s.returnPath) {
                          c({
                            id: 0,
                            size: 0
                          })
                        } else {
                          var Y = W.attr("fileSize");
                          c({
                            id: 0,
                            size: Y
                          })
                        }
                        X.remove()
                      })
                    }
                    return;
                  case 1:
                    T += 90;
                    break;
                  case 2:
                    T -= 90;
                    break
                }
                var S = b(this).parent().parent().index();
                var V = C.find(".imgWrap :eq(" + S + ")");
                if (B) {
                  var U = "rotate(" + T + "deg)";
                  V.css({
                    "-webkit-transform": U,
                    "-mos-transform": U,
                    "-o-transform": U,
                    transform: U
                  })
                } else {
                  V.css("filter", "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + (~~((T / 90) % 4 + 4) % 4) + ")")
                }
                b(this).parent().data("fileRotation", T)
              })
            } else {
              $li = b('<tr id="' + O.id + '" class="template-upload"><td class="name"><i class="fa fa-file-text-o"></i>' + O.fileName + '</td><td class="size">' + (s.returnPath ? "" : WebUploader.formatSize(O.fileEntity.fileSize)) + '</td><td class="prog_bar">' + (O.progress ? O.progress : (O.createByName ? O.createByName : "")) + '</td><td class="msg">' + (O.message ? O.message : (O.createDate ? O.createDate : "")) + '</td><td class="btncancel">' + (s.preview != "" ? '<a class="btn btn-default btn-xs preview" herf="javascript:void(0);" previewUrl="' + M + "?fileName=" + O.fileName + "&preview=" + s.preview + '"><i class="fa fa-eye"></i> ' + t("预览") + "</a> &nbsp;" : "") + '<a class="btn btn-danger btn-xs delete' + (!s.readonly ? "" : " hide") + '" fileUploadId="' + O.id + '" fileUrl="' + M + '" fileName="' + O.fileName + '" fileSize="' + O.fileEntity.fileSize + '"><i class="fa fa-trash-o"></i> ' + t("删除") + " </a></td></tr>");
              $li.on("click", "a.preview", function() {
                js.windowOpen(b(this).attr("previewUrl"))
              });
              if (!s.readonly) {
                $li.on("click", "a.delete", function() {
                  var T = b(this)
                    , S = b(this).closest("tr");
                  js.confirm(t("确定删除该文件吗？"), function(V) {
                    e(T);
                    if (s.returnPath) {
                      c({
                        id: 0,
                        size: 0
                      })
                    } else {
                      var U = T.attr("fileSize");
                      c({
                        id: 0,
                        size: U
                      })
                    }
                    S.remove()
                  });
                  return
                })
              }
            }
            y++;
            m += O.fileEntity.fileSize;
            C.append($li);
            D(O.id, M, O.fileName)
          }
        }
        if (J.length > 0 || w.length > 0) {
          if (!s.readonly) {
            l.show()
          }
          I("ready")
        }
        i()
      }
      ;
      k.refreshFileListByPath = function() {
        var O = [], Q = [], P, M = b("#" + s.filePathInputId).val(), N = b("#" + s.fileNameInputId).val();
        if (M != undefined && M != "") {
          Q = M.split("|")
        }
        if (N != undefined && N != "") {
          P = N.split("|")
        }
        if (P == undefined || P.length != Q.length) {
          P = Q
        }
        b.each(Q, function(R, U) {
          var T = P[R].split("/");
          var S = T[T.length - 1];
          O.push({
            id: String(Math.random()).replace(".", ""),
            fileName: S,
            fileUrl: U,
            fileEntity: {
              fileSize: 0
            },
          })
        });
        k.refreshFileList(O, true)
      }
      ;
      k.refreshFileListByBizData = function() {
        b.ajax({
          url: s.service.fileList + (s.service.fileList.indexOf("?") == -1 ? "?" : "&") + "__t=" + new Date().getTime(),
          data: {
            bizKey: s.bizKey,
            bizType: s.bizType
          },
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          success: function(M) {
            if (!(M.result == "false")) {
              k.refreshFileList(M, true)
            }
          }
        })
      }
      ;
      if (s.bizKey != "" && s.bizType != "") {
        k.refreshFileListByBizData()
      } else {
        if (s.returnPath) {
          k.refreshFileListByPath()
        }
      }
      return k
    };
    if (!window.webuploaderRegister) {
      window.webuploaderRegister = true;
      WebUploader.Uploader.register({
        name: "fileupload",
        "before-send-file": "beforeSendFile",
        "before-send": "beforeSend",
        "after-send-file": "afterSendFile"
      }, {
        beforeSendFile: function(e) {
          var d = this
            , f = d.owner
            , c = WebUploader.Deferred();
          f.md5File(e, 0, 10 * 1024 * 1024).then(function(g) {
            e.md5 = g;
            b.ajax({
              type: "POST",
              url: f.options.server,
              data: {
                fileMd5: g,
                fileName: e.name
              },
              cache: false,
              async: false,
              timeout: 10000,
              dataType: "json",
              success: function(h) {
                if (h.result == "true") {
                  e.fileUpload = h.fileUpload;
                  if (f.options.imageFlag) {
                    e.fileUpload.message = '<p class="error" title="' + h.message + '">' + h.message + "</p>"
                  } else {
                    e.fileUpload.progress = '<p class="progress"><span class="progress-bar" style="display:block;width:100%;">100%</span></p>';
                    e.fileUpload.message = '<span class="label label-sm label-success" title="' + h.message + '">' + h.message + "</span>"
                  }
                  f.skipFile(e);
                  c.reject()
                } else {
                  e.fileUploadId = h.fileUploadId;
                  e.fileEntityId = h.fileEntityId;
                  c.resolve()
                }
              }
            })
          });
          return c.promise()
        },
        beforeSend: function(f) {
          var c = this
            , e = c.owner
            , d = f.file;
          e.options.formData.fileMd5 = d.md5;
          e.options.formData.fileName = d.name;
          e.options.formData.fileUploadId = d.fileUploadId;
          e.options.formData.fileEntityId = d.fileEntityId
        },
        afterSendFile: function(c) {}
      });
      b("textarea").each(function() {
        var c = b(this);
        c.data("x", c.outerWidth());
        c.data("y", c.outerHeight());
        c.mouseup(function() {
          var d = b(this);
          if (d.outerWidth() != d.data("x") || d.outerHeight() != d.data("y")) {
            window.webuploaderRefresh()
          }
          d.data("x", d.outerWidth());
          d.data("y", d.outerHeight())
        })
      })
    }
    b.fn.webuploader = function(d, f) {
      var e;
      var c = this.each(function() {
        var i = b(this);
        var h = i.data("webuploader");
        var g = typeof d === "object" && d;
        if (!h) {
          h = new a(g,i);
          i.data("webuploader", h)
        }
        if (typeof d === "string" && typeof h[d] === "function") {
          if (f instanceof Array) {
            e = h[d].apply(h, f)
          } else {
            e = h[d](f)
          }
        }
      });
      return (e === undefined) ? c : e
    }
    ;
    b.fn.webuploader.defaults = {
      id: "",
      bizKey: "",
      bizType: "",
      readonly: false,
      returnPath: false,
      filePathInputId: "",
      fileNameInputId: "",
      uploadType: "",
      imageAllowSuffixes: ".gif,.bmp,.jpeg,.jpg,.ico,.png,.tif,.tiff,",
      mediaAllowSuffixes: ".flv,.swf,.mkv,webm,.mid,.mov,.mp3,.mp4,.m4v,.mpc,.mpeg,.mpg,.swf,.wav,.wma,.wmv,.avi,.rm,.rmi,.rmvb,.aiff,.asf,.ogg,.ogv,",
      fileAllowSuffixes: ".doc,.docx,.rtf,.xls,.xlsx,.csv,.ppt,.pptx,.pdf,.vsd,.txt,.md,.xml,.rar,.zip,7z,.tar,.tgz,.jar,.gz,.gzip,.bz2,.cab,.iso,",
      maxFileSize: 100 * 1024 * 1024,
      maxUploadNum: 300,
      imageMaxWidth: 1024,
      imageMaxHeight: 768,
      service: {
        upload: ctxAdmin + "/file/upload",
        download: ctxAdmin + "/file/download/",
        fileList: ctxAdmin + "/file/fileList"
      },
      extendParams: {},
      chunked: false,
      chunkSize: 10 * 1024 * 1024,
      threads: 3,
      isLazy: false,
      preview: "",
      useCapture: false,
      autoDownload: false
    }
  }
)(jQuery);
