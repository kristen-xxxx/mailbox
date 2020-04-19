import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Card, Input, Button } from 'antd';
import UploadDrag from './UploadDrag';
export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageHeaderWrapper>
      <Card>
        <Input placeholder="发件人" disabled={true} />

        <div
          style={{
            margin: '24px 0',
          }}
        />

        <Input placeholder="收件人" onChange={e => console.log(e.target.value)} allowClear />

        <div
          style={{
            margin: '24px 0',
          }}
        />

        <Input placeholder="抄送" onChange={e => console.log(e.target.value)} allowClear />

        <div
          style={{
            margin: '24px 0',
          }}
        />

        <Input placeholder="密送" onChange={e => console.log(e.target.value)} allowClear />

        <div
          style={{
            margin: '24px 0',
          }}
        />

        <Input.TextArea
          placeholder="邮件内容"
          onChange={e => console.log(e.target.value)}
          autoSize={{
            minRows: 10,
            maxRows: 10,
          }}
        />

        <div style={{margin:'24px 0',}}/>

        <UploadDrag />

        <div style={{margin:'24px 0',}}/>
        
        <Button type="primary" style={{float: "right" }}>发送</Button>
        <Button style={{marginRight:'8px', float: "right" }}>取消</Button>
        

      </Card>
      

      <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        <Spin spinning={loading} size="large" />
      </div>
    </PageHeaderWrapper>
  );
};
