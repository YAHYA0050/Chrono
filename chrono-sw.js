const CACHE='chrono-v2';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('push',e=>{
  const d=e.data?e.data.json():{title:'CHRONO',body:'إشعار جديد'};
  e.waitUntil(self.registration.showNotification(d.title,{
    body:d.body, icon:d.icon||'', tag:d.tag||'chrono',
    renotify:true, vibrate:[200,100,200],
    data:{url:d.url||'/'}
  }));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(
    clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
      if(l.length)return l[0].focus();
      return clients.openWindow(e.notification.data?.url||'/');
    })
  );
});
