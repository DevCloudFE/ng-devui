import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BadgeModule } from 'ng-devui/badge/badge.module';
import { BadgeComponent } from './badge.component';
@Component({
    template: `
        <d-badge [count]="count" [status]="status" [badgePos]="badgePos" [showDot]="showDot" [maxCount]="maxCount">
            <div>未读消息</div>
        </d-badge>
    `
})
class HasContentBadgeComponent {
    count = 8;
    status = 'danger';
    badgePos = 'top-right';
    showDot = false;
    maxCount = 99;
}

@Component({
    template: `
        <d-badge [count]="count" [status]="status" [showDot]="showDot">
        </d-badge>
    `
})
class NoContentBadgeComponent {
    count = 6;
    status = 'danger';
    showDot = false;
}

describe('badge', () => {
    let fixture: ComponentFixture<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BadgeModule],
            declarations: [HasContentBadgeComponent, NoContentBadgeComponent],
        });
    });

    describe('has content badge', () => {
        let debugEl: DebugElement;
        let component: HasContentBadgeComponent;
        let spanElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(HasContentBadgeComponent);
            debugEl = fixture.debugElement;
            component = fixture.componentInstance;
            spanElement = debugEl.query(By.directive(BadgeComponent)).nativeElement;

            fixture.detectChanges();
        });

        it('should create correctly', () => {
            expect(component).toBeTruthy();
        });

        it('should have create status container', () => {
            expect(spanElement).toBeTruthy();
        });

        describe('content badge', () => {
            it('Badge should has content type', () => {
                expect(spanElement.querySelector('.devui-badge-content')).toBeTruthy();
            });

            it('Badge should has danger type', () => {
                expect(spanElement.querySelector('.devui-badge-content-danger')).toBeTruthy();
            });

            it('Badge should has warning type', () => {
                component.status = 'warning';
                fixture.detectChanges();
                expect(spanElement.querySelector('.devui-badge-content-warning')).toBeTruthy();
            });

            it('Badge should has waiting type', () => {
                component.status = 'waiting';
                fixture.detectChanges();
                expect(spanElement.querySelector('.devui-badge-content-waiting')).toBeTruthy();
            });

            it('Badge should has success type', () => {
                component.status = 'success';
                fixture.detectChanges();
                expect(spanElement.querySelector('.devui-badge-content-success')).toBeTruthy();
            });

            it('Badge should has info type', () => {
                component.status = 'info';
                fixture.detectChanges();
                expect(spanElement.querySelector('.devui-badge-content-info')).toBeTruthy();
            });
        });

        describe('max count', () => {
            it('Badge should has max count', () => {
                component.count = 12;
                component.maxCount = 9;
                fixture.detectChanges();
                expect(spanElement.querySelector('.devui-badge-content-count').textContent).toBe('9+');
            });
        });

        describe('content dot badge', () => {
            it('Badge should has content dot type', () => {
                component.showDot = true;
                fixture.detectChanges();
                expect(spanElement.querySelector('.devui-badge-content-dot')).toBeTruthy();
            });
        });
    });

    describe('no content badge', () => {
        let debugEl: DebugElement;
        let component: NoContentBadgeComponent;
        let spanElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(NoContentBadgeComponent);
            debugEl = fixture.debugElement;
            component = fixture.componentInstance;
            spanElement = debugEl.query(By.directive(BadgeComponent)).nativeElement;

            fixture.detectChanges();
        });

        it('should create correctly', () => {
            expect(component).toBeTruthy();
        });

        it('should have create status container', () => {
            expect(spanElement).toBeTruthy();
        });

        describe('count badge', () => {
            it('Badge should has count type', () => {
                expect(spanElement.querySelector('.devui-badge-count')).toBeTruthy();
            });
        });

        describe('status badge', () => {
            it('Badge should has status type', () => {
                component.showDot = true;
                fixture.detectChanges();
                expect(spanElement.querySelector('.devui-badge-status')).toBeTruthy();
            });
        });
    });
});
