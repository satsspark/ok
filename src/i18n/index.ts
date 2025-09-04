import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  zh: {
    translation: {
      // 导航和标题
      'app.title': 'OKONS',
      'nav.home': '首页',
      'nav.search': '搜索',
      'nav.manage': '管理',
      'nav.about': '关于',
      'nav.myNames': '我的名称',
      'nav.names': '名称',
      
      // 搜索页面
      'search.title': '搜索域名',
      'search.subtitle': '输入您想要的域名，立即查看可用性',
      'search.placeholder': '输入您想要的域名',
      'search.button': '搜索',
      'search.available': '可用',
      'search.unavailable': '不可用',
      'search.invalid': '无效域名',
      'search.loading': '搜索中...',
      
      // 首页
      'home.title': '打造您的 Web3 身份',
      'home.subtitle': '注册专属的 .okb 域名，构建您的去中心化数字身份',
      'home.recentDomains': '最新注册域名',
      'home.loadingDomains': '获取最新注册域名中...',
      
      // 注册页面
      'register.title': '注册域名',
      'register.duration': '注册时长',
      'register.permanent': '永久',
      'register.cost': '永久注册费用',
      'register.button': '注册域名',
      'register.success': '域名注册成功！',
      'register.error': '注册失败',
      'register.connecting': '提交中...',
      'register.confirming': '确认中...',
      'register.submitted': '交易已提交，请等待确认',
      
      // 钱包连接
      'wallet.connect': '连接钱包',
      'wallet.connected': '已连接',
      'wallet.disconnect': '断开连接',
      'wallet.installing': '请安装MetaMask',
      'wallet.wrongNetwork': '请切换到以太坊主网',
      
      // 通用
      'common.loading': '加载中...',
      'common.error': '发生错误',
      'common.retry': '重试',
      'common.cancel': '取消',
      'common.confirm': '确认',
      'common.back': '返回',
      
      // 域名管理
      'manage.title': '我的名称',
      'manage.nodomains': '您还没有注册任何名称',
      'manage.expires': '到期时间',
      'manage.renew': '续费',
      'manage.transfer': '转移',
      'manage.setTwitter': '设置Twitter',
      'manage.setResolver': '设置解析器',
      'manage.owner': '拥有者',
      'manage.registrationFee': '注册费用',
      'manage.type': '类型',
      'manage.permanent': '永久域名',
      'manage.notSet': '未设置',
      
      // Names page
      'names.title': '我的名称',
      'names.subtitle': '管理您拥有的.okb域名和记录',
      'names.connectWallet': '请先连接钱包查看您的域名',
      'names.switchNetwork': '请切换到X Layer网络',
      'names.refresh': '刷新域名',
      'names.count': '您拥有 {{count}} 个域名',
      'names.empty.title': '还没有注册域名',
      'names.empty.description': '开始搜索并注册您的第一个.okb域名！',
      
      // Twitter management
      'manage.twitter.title': '设置Twitter记录',
      'manage.twitter.placeholder': '输入Twitter用户名 (不含@)',
      'manage.twitter.success': 'Twitter记录更新成功！交易哈希:',
      'manage.twitter.error': '更新失败',
      
      // Transfer management
      'manage.transfer.title': '转移域名',
      'manage.transfer.placeholder': '输入接收者的钱包地址',
      'manage.transfer.invalidAddress': '请输入有效的钱包地址',
      'manage.transfer.success': '域名转移成功！交易哈希:',
      'manage.transfer.error': '转移失败',
      'manage.transfer.confirm': '确认转移',
      
      // Common actions
      'common.save': '保存',
      'common.updating': '更新中...',
      'common.transferring': '转移中...',
      'common.tryAgain': '请重试',
      
      // 错误消息
      'error.networkError': '网络错误，请检查连接',
      'error.walletError': '钱包操作失败',
      'error.contractError': '合约调用失败',
      'error.invalidDomain': '域名格式不正确',
      'error.invalidFormat': '域名格式无效',
      'error.invalidLength': '域名长度必须在1-50字符之间',
      'error.insufficientFunds': '余额不足',
      'error.userCancelled': '用户取消操作',
      'error.domainTaken': '域名已被注册',
      'error.wrongNetwork': '请切换到X Layer网络',
      'error.walletNotReady': '钱包未准备好',
      'error.searchFailed': '搜索失败，请重试'
    }
  },
  en: {
    translation: {
      // Navigation and titles
      'app.title': 'OKONS',
      'nav.home': 'Home',
      'nav.search': 'Search',
      'nav.manage': 'Manage',
      'nav.about': 'About',
      'nav.myNames': 'My Names',
      'nav.names': 'Names',
      
      // Home page
      'home.title': 'Build Your Web3 Identity',
      'home.subtitle': 'Register your exclusive .okb domain and build your decentralized digital identity',
      'home.recentDomains': 'Latest Registered Domains',
      'home.loadingDomains': 'Loading latest registered domains...',
      
      // Search page
      'search.title': 'Search Domains',
      'search.subtitle': 'Enter your desired domain name to check availability instantly',
      'search.placeholder': 'Enter your desired domain name',
      'search.button': 'Search',
      'search.available': 'Available',
      'search.unavailable': 'Unavailable',
      'search.invalid': 'Invalid domain',
      'search.loading': 'Searching...',
      
      // Register page
      'register.title': 'Register Domain',
      'register.duration': 'Registration Duration',
      'register.years': 'years',
      'register.cost': 'Permanent Registration Fee',
      'register.button': 'Register Domain',
      'register.success': 'Domain registered successfully!',
      'register.error': 'Registration failed',
      'register.connecting': 'Submitting...',
      'register.confirming': 'Confirming...',
      'register.submitted': 'Transaction submitted, please wait for confirmation',
      
      // Wallet connection
      'wallet.connect': 'Connect Wallet',
      'wallet.connected': 'Connected',
      'wallet.disconnect': 'Disconnect',
      'wallet.installing': 'Please install MetaMask',
      'wallet.wrongNetwork': 'Please switch to Ethereum Mainnet',
      
      // Common
      'common.loading': 'Loading...',
      'common.error': 'An error occurred',
      'common.retry': 'Retry',
      'common.cancel': 'Cancel',
      'common.confirm': 'Confirm',
      'common.back': 'Back',
      
      // Names page
      'names.title': 'My Names',
      'names.subtitle': 'Manage your .okb domains and records',
      'names.connectWallet': 'Please connect your wallet to view your domains',
      'names.switchNetwork': 'Please switch to X Layer network',
      'names.refresh': 'Refresh Domains',
      'names.count': 'You own {{count}} domains',
      'names.empty.title': 'No Domains Registered Yet',
      'names.empty.description': 'Start searching and register your first .okb domain!',
      
      // Domain management
      'manage.title': 'My Domains',
      'manage.nodomains': 'You haven\'t registered any domains yet',
      'manage.expires': 'Expires',
      'manage.renew': 'Renew',
      'manage.transfer': 'Transfer',
      'manage.setResolver': 'Set Resolver',
      'manage.owner': 'Owner',
      'manage.registrationFee': 'Registration Fee',
      'manage.type': 'Type',
      'manage.permanent': 'Permanent Domain',
      'manage.notSet': 'Not Set',
      
      // Error messages
      'error.networkError': 'Network error, please check connection',
      'error.walletError': 'Wallet operation failed',
      'error.contractError': 'Contract call failed',
      'error.invalidDomain': 'Invalid domain format',
      'error.invalidFormat': 'Invalid domain format',
      'error.invalidLength': 'Domain length must be 1-50 characters',
      'error.insufficientFunds': 'Insufficient balance',
      'error.userCancelled': 'User cancelled operation',
      'error.domainTaken': 'Domain already registered',
      'error.wrongNetwork': 'Please switch to X Layer network',
      'error.walletNotReady': 'Wallet not ready',
      'error.searchFailed': 'Search failed, please try again'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh', // 默认中文
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
