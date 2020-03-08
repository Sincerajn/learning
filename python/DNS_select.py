import os
import re

class DNS:

    def __init__(self, path):
        self.path = path

    def get_delay(self):
        command = 'ping ' + self.path
        r = os.popen(command)
        info = r.readlines()
        delay = re.findall(r'\d+', info[-1])[-1]
        return delay

dns_list = {
    'DNSPod(腾讯)': '119.29.29.29',
    'Alidns(阿里)': '223.5.5.5',
    'BaiduDNS(百度)': '180.76.76.76',
    '114DNS': '114.114.114.114',
    'Cloudflare DNS': '1.1.1.1',
    'Google Public DNS': '8.8.8.8',
    'IBM Public DNS': '9.9.9.9',
    'Norton DNS': '199.85.126.10',
    'OpenDNS': '208.67.222.222',
    'OpenDNS FamilyShield': '208.67.222.123',
    'Yandex DNS': '77.88.8.8',
    'COMODO SecureDNS': '8.26.56.26',
    'Neustar UltraDNS': '156.154.70.1',
}

print("DNS 选优以启动，测试速度中……\n")

dns_delays = {} # DNS 与延迟字典

for dns in dns_list:
    obj = DNS(dns_list[dns]) # 实例化 DNS 对象
    dns_delay = obj.get_delay() # 获取 DNS 延迟
    dns_delays[dns] = int(dns_delay)
    
    print('%s 提供的 %s 延迟为：%sms' % (dns, dns_list[dns], dns_delay))

best_dns = sorted(dns_delays.items(), key = lambda item:item[1])[0][0]
best_dns_delays = sorted(dns_delays.items(), key = lambda item:item[1])[0][1]

print('\n最佳 DNS 为 %s，延迟为 %dms' % (dns_list[best_dns], best_dns_delays))

print('''
你可以在:
网络和 Internet 访问 > 打开网络和 Internet 设置 > 更改适配器选项 > 以太网 > 属性 > Internet 协议版本 4(TCP/IPv4) > 属性
中将首选 DNS 设置为最佳 DNS
''')

while(input('按任意键以退出程序 ……')):
    exit()