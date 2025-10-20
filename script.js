// 【重要】認証用の正しいIDとパスワードをここに設定します
const CORRECT_ID = "admin";
const CORRECT_PASSWORD = "password123";

// 認証トークンとして使うためのセッションストレージキー
const AUTH_KEY = 'isAuthenticated';

/**
 * ログインフォームの送信を処理します。（login.html用）
 */
function handleLogin() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // フォームのデフォルト送信を防ぐ

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorElement = document.getElementById('errorMessage');

            // IDとパスワードのチェック（ブラウザ側での簡易チェック）
            if (username === CORRECT_ID && password === CORRECT_PASSWORD) {
                // 認証成功！
                errorElement.textContent = ''; // エラーメッセージをクリア
                
                // セッションストレージに認証済みフラグを設定
                sessionStorage.setItem(AUTH_KEY, 'true');
                
                // ホーム画面へ遷移
                window.location.href = 'home.html';
                
            } else {
                // 認証失敗
                errorElement.textContent = 'IDまたはパスワードが間違っています。';
                sessionStorage.removeItem(AUTH_KEY); // 念のためフラグを削除
            }
        });
    }
}

/**
 * ホーム画面（home.html）のアクセス制御をチェックします。
 */
function checkAuthentication() {
    // ログインページの場合は認証チェックをスキップ
    if (window.location.pathname.endsWith('login.html') || window.location.pathname.endsWith('/')) {
        return;
    }

    // 認証フラグがなければ、ログインページへ強制リダイレクト
    if (sessionStorage.getItem(AUTH_KEY) !== 'true') {
        alert('アクセスするにはログインが必要です。');
        window.location.href = 'login.html';
    }
}

/**
 * ログアウト処理を実行します。（home.html用）
 */
function logout() {
    sessionStorage.removeItem(AUTH_KEY); // 認証フラグを削除
    window.location.href = 'login.html'; // ログインページへ戻る
}


// ページが読み込まれたときに実行
document.addEventListener('DOMContentLoaded', () => {
    handleLogin();
    checkAuthentication();
});
