/**
 * Created by lixiaoxi on 2017/3/6.
 * @description
 */

import Router from 'koa-router'
const router = Router()

const Collect = (ctx) => ctx.mongo.db('koa-db').collection('Hello');

router.get('/list', async (ctx, next) => {
    const r = await Collect(ctx).find({}).toArray();

    ctx.cookies.set('koa-test', Date.now() + 'koa-id', {});
    ctx.body = r;
});

router.get('/detail/:uid', async (ctx, next) => {
    const uid = ctx.params.uid;
    const result = await Collect(ctx)
        .find({uid: uid})
        .toArray();

    ctx.body = result;
});

router.get('/insert/:uid', async (ctx) => {
    const params = ctx.params;
    const query = ctx.query;
    console.log(ctx.query); //get
    //ctx.request.body  post
    const result = await Collect(ctx)
        .updateOne({uid: params.uid}, {
            uid: params.uid,
            name: '产品一',
            profit: '0.08',
            ...query,
        }, {upsert: true});

    ctx.body = result.result.ok ? '成功' : '失败';
})


router.get('/update', async (ctx, next) => {
    // const result = await ctx.mongo.db('koa-db')
    //     .collection('Hello')
    //     .insertOne({name: 'Test Insert One'});
    //
    // const id = result.ops[0]._id.toString();
    const result = await ctx.mongo.db('koa-db')
        .collection('Hello')
        .updateOne({name: "Test Insert One"}, {name: "Update One"}, {upsert: true})
    // .toArray()

    // result.setReadPreference('primary');
    // const a = await result.toArray();
    console.log(result, '------')
    await ctx.render('./dbtest', {
        title: 'Test',
        result: JSON.stringify(result)
    })
});

// demo page
router.get('/*', async (ctx, next) => {
    await ctx.render('./index', {
        title: 'DB Test Home'
    });
})




export default router