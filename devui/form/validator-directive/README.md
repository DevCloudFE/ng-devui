# 当前接口定义
+ 

## Angular FormGroup如何进行模板式？
+ 好像搞不定，整个form粒度的校验需要使用响应式表单进行，但是这个太麻烦了，这个需要进行优化
+ 可以通过指令去获取，创建一个formGroup，获取当前ng-content下的所有（是否需要排除一些不作为选中）
+ ngForm、ngModelGroup是啥意思？有啥作用？他们可以用来组织整个模板驱动表单，也能获取验证器，不过他们要怎么绑定验证器呢，通过注入的形式好像无法获取手动再注入，需要通过模板式注入？或者通过响应式驱动？
+ 问题又来了，响应式如何与model关联的呢？主要为了关联验证这一套，model无法自行进入angular一套生命周期
+ ngForm与ngModelGroup并没有关联对应的model，这种如何关联验证器呢？也就是说它只能状态更新，没有办法添加新的验证器。还与ngModel不一样，不过ngForm内部是有自己的个formGroup，那么ngModelGroup呢？
+ 指令验证器都是通过NG_VALIDATORS进行注入自身，然后再获取到，但是如果是new formControl则需要一开始就配置好验证器，只能在构造器阶段写入，这两者是不是就冲突了，因为如果要自定义，没有办法混用模板驱动验证器了
+ 也就是说验证器都是静态添加的，不能进行动态添加，这个需要怎么办呢？模板与响应式还不能混用
+ 当前control提供了一个setValidators方法，可支持重新定义校验器，应该可以用起来
+ 也就是说当前ngModelGroup没有实现内部对应的formGroup，其实是有的，AbstractFormGroupDirective会在init时在其父级（父级只能是ngForm）创建一个空的formGroup，然后添加进去
+ 那么现在就剩理清，对于不同的情况，如果去获取到其model对象进行验证了
+ 当前模板驱动表单，直接传入formControl应该没有什么问题了，但是如果响应式表单，并且需要联动就有点麻烦了

+ 如果当前没有使用到模板驱动与响应式，是否需要创建一个control进行绑定呢，好像就算绑定了，也比较麻烦

+ 其实，使用ngModel是比较简单的，因为无论怎么样，你需要使用验证器，那么都需要绑定一个值，那么无论如何绑定，那么ngModel是最简单的方式，就算我们自己实现的指令可以进行值绑定了，那其实还是不如ngModel优雅，ngModel具有统一性，且可以与验证器解耦。

```他下边这一套是如何实现的呢？
<form class="form" #f="ngForm" novalidate>

  <div class="form-group" #fgName="ngModelGroup" ngModelGroup="name" [class.has-error]="!fgName.valid">
    <input type="text" class="form-control" name="firstName"
            [(ngModel)]="user.firstName"
            placeholder="first name"
            required>

    <input type="text" class="form-control" name="lastName"
            [(ngModel)]="user.lastName"
            placeholder="last name"
            required>
  </div>

  <div class="form-group">
    <input type="text" class="form-control" name="address"
            [(ngModel)]="user.address"
            placeholder="address"
            required>
  </div>

  <button class="btn btn-primary" [disabled]="!f.valid">Submit</button>

</form>
```因为ngModelGroup继承了ControlContainer注入，将自己注入进来，那么自己formControl在验证时，将通过@Host() @SkipSelf() parent: ControlContainer，获取到父级的实例，然后去更新父级的状态。

## 我们也需要映射一些类到表单上