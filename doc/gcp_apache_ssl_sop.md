# GCP + Apache 免費 SSL 憑證 (Let's Encrypt) 申請與設定 SOP

本指南旨在說明如何在 Google Cloud Platform (GCP) 的 VM 執行個體上，針對執行 Apache 網頁伺服器的網站，使用 Certbot 申請並自動部署 Let's Encrypt 免費 SSL 憑證。

---

## 步驟一：事前準備與環境確認

> [!WARNING]
> 在執行任何終端機指令前，請務必確認以下兩項設定已完成，否則 Certbot 驗證將會失敗。

1. **DNS 設定確認**
   * 確認您的網域（包含主網域 `example.com` 與子網域 `www.example.com`）的 **DNS A 紀錄**，已經正確指向此 GCP VM 的外部 IP。
2. **GCP 防火牆確認**
   * 進入 GCP 控制台的「VM 執行個體」頁面。
   * 編輯您的 VM 設定，確保在「防火牆」區塊有勾選 **「允許 HTTPS 流量」**（允許 Port 443）。

---

## 步驟二：連線並安裝 Certbot

1. 在 GCP VM 執行個體列表，點擊右側的 **SSH** 按鈕，開啟網頁版終端機。
2. 確認目前的網頁伺服器是否為 Apache（若不確定可略過此步）：
   ```bash
   sudo ss -tulpn | grep ':80'
   ```
   *若清單最右側顯示 `apache2` 或 `httpd` 即可繼續。*
3. 更新系統的套件清單：
   ```bash
   sudo apt update
   ```
4. 安裝 Certbot 主程式以及 Apache 專用外掛套件：
   ```bash
   sudo apt install certbot python3-certbot-apache -y
   ```

---

## 步驟三：申請與部署憑證

安裝完成後，執行以下指令開始自動申請憑證，並讓它自動修改 Apache 設定檔：

```bash
sudo certbot --apache
```

執行後會進入互動式問答流程，請依照以下說明回答：

1. **Enter email address**
   * **動作**：輸入您的電子郵件信箱。
   * **說明**：用於接收憑證即將過期或重大安全性通知。
2. **Please read the Terms of Service...**
   * **動作**：輸入 `Y`。
   * **說明**：同意 Let's Encrypt 的服務條款。
3. **Would you be willing... share your email address with the EFF...**
   * **動作**：輸入 `N`（推薦）。
   * **說明**：是否願意接收 EFF（電子前哨基金會）的推廣電子報。
4. **Please enter the domain name(s) you would like on your certificate...**
   * **動作**：手動輸入您的完整網域（建議同時輸入有 www 與無 www 的版本，中間以**半形空格**分隔）。
   * **範例**：`tcffilter.com www.tcffilter.com`
5. **Which virtual host would you like to choose?** (如出現此提示)
   * **動作**：選擇已經有 `HTTPS` 標示，或是原先的 `000-default.conf` 選項的數字（通常輸入 `2` 將次要網域掛載到主要 HTTPS 設定檔下）。
6. **Please choose whether or not to redirect HTTP traffic to HTTPS...**
   * **動作**：輸入 `2` (Redirect)（**強烈推薦**）。
   * **說明**：這會強制所有訪客在輸入舊的 HTTP 網址時，自動跳轉到安全的 HTTPS 網址。

---

## 步驟四：驗證與自動續約測試

Let's Encrypt 的憑證效期為 **90 天**。Certbot 在安裝時已自動在系統背景設定好定時任務（Cron job / systemd timer），它會在憑證到期前 30 天內自動連線續約。

> [!TIP]
> 建議在安裝完畢後，執行一次「模擬續約演習」來確保排程機制運作正常。

執行以下指令進行模擬測試：
```bash
sudo certbot renew --dry-run
```

如果終端機最後顯示 `Congratulations, all simulated renewals succeeded`，即代表您的自動續約機制已完美設定完成，未來無需再進行任何手動操作。

---

## 結語

完成上述所有步驟後，請開啟瀏覽器並輸入 `https://您的網域`。只要網址列左側出現了**鎖頭圖示**，就代表網站的 SSL 安全加密已經大功告成！
