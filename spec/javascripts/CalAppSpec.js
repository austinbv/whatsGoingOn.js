describe('Models', function () {
  describe("Meeting", function () {
    it('is definable', function () {
      var meeting = new CalApp.Models.Meeting({});
      expect(meeting).toBeDefined();
    });

    describe('#validate', function () {
      it('should require a startTime', function () {
        var meeting = new CalApp.Models.Meeting({
          endTime:Date.now,
          meetingRoom:'1'
        });

        expect(meeting.isValid()).toBeFalsy();
      });

      it('should require a endTime', function () {
        var meeting = new CalApp.Models.Meeting({
          startTime:Date.now,
          meetingRoom:'1'
        });

        expect(meeting.isValid()).toBeFalsy();
      });

      it('should require a meetingRoom', function () {
        var meeting = new CalApp.Models.Meeting({
          startTime:Date.now,
          endTime:Date.now
        });

        expect(meeting.isValid()).toBeFalsy();
      });

      it('should be valid with all startTime, endTime, and meetingRoom defined', function () {
        var meeting = new CalApp.Models.Meeting({
          startTime:Date.now,
          endTime:Date.now,
          meetingRoom:'1'
        });

        expect(meeting.isValid()).toBeTruthy();
      });

      it('should not allow start times after end times', function () {
        var meeting = new CalApp.Models.Meeting({
          startTime:new Date(2012),
          endTime:new Date(2011),
          meetingRoom:'1'
        });

        expect(meeting.isValid()).toBeFalsy();
      });
    });

    describe('#parse', function () {
      var parsedResponse;
      beforeEach(function () {
        parsedResponse = new CalApp.Models.Meeting().parse(CalApp.fixtures.item);
      });
      it('should collect the title', function () {
        expect(parsedResponse.title).toEqual('Big Meeting');
      });

      it('should collect the attendees', function () {
        expect(parsedResponse.attendees).toEqual(jasmine.any(Array));
        expect(parsedResponse.attendees).toEqual(['Batman', 'Robin', 'Mario', 'email4@example.com']);
      });

      it('should collect the startTime', function () {
        expect(parsedResponse.startTime).toEqual(jasmine.any(Date));
        expect(parsedResponse.startTime).toEqual(new Date(Date.parse("2012-02-29T08:00:00-08:00")))
      });

      it('should collect the endTime', function () {
        expect(parsedResponse.endTime).toEqual(jasmine.any(Date));
        expect(parsedResponse.endTime).toEqual(new Date(Date.parse("2012-02-29T17:00:00-08:00")))
      });
    });
  });

  describe("Clock", function () {
    describe('#initialize', function () {
      var clock = null, date = null,

        weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
          'Thursday', 'Friday', 'Saturday'],

        months = ['January', 'February', 'March', 'April',
          'May', 'June', 'July', 'August',
          'September', 'October', 'November', 'December']

      beforeEach(function () {
        date = new Date;
        clock = new CalApp.Models.Clock();
      });

      it('should set the second', function () {
        expect(clock.get('second')).toEqual(date.getSeconds());
      });

      it('should set the minute', function () {
        expect(parseInt(clock.get('minute'), 10))
          .toEqual(date.getMinutes());
      });

      it('should set the hour', function () {
        expect(clock.get('hour')).toEqual(date.getHours());
      });

      it('should set the dayOfWeek', function () {
        expect(clock.get('dayOfWeek')).toEqual(weekDays[date.getDay()]);
      });

      it('should set the dayOfMonth', function () {
        expect(clock.get('dayOfMonth')).toEqual(date.getDate());
      });

      it('should set the month', function () {
        expect(clock.get('month')).toEqual(months[date.getMonth()]);
      });
    });
  });
});

describe('Collections', function () {
  describe('Meetings', function () {
    var meetings, meeting1, meeting2, meeting3, meeting4;
    beforeEach(function () {
      meeting1 = new CalApp.Models.Meeting({
        startTime:new Date(2012, 0, 10, 10, 30),
        endTime:new Date(2012, 0, 10, 11, 30),
        meetingRoom:'1'
      });

      meeting2 = new CalApp.Models.Meeting({
        startTime:new Date(2012, 0, 11, 10, 30),
        endTime:new Date(2012, 0, 11, 11, 30),
        meetingRoom:'1'
      });

      meeting3 = new CalApp.Models.Meeting({
        startTime:new Date(2012, 0, 12, 10, 30),
        endTime:new Date(2012, 0, 12, 11, 30),
        meetingRoom:'1'
      });

      meeting4 = new CalApp.Models.Meeting({
        startTime:new Date(2012, 0, 13, 10, 30),
        endTime:new Date(2012, 0, 13, 11, 30),
        meetingRoom:'1'
      });

      meetings = new CalApp.Meetings()
    });

    it('should be definable', function () {
      expect(meetings).toBeDefined();
    });

    describe('Adding Meetings', function () {
      describe('#add', function () {
        it('adds as from JSON', function () {
          meetings.add({
            startTime:new Date(2012, 0, 12, 10, 30),
            endTime:new Date(2012, 0, 12, 11, 30),
            meetingRoom:'Any'
          });

          expect(meetings.length).toEqual(1);
        });

        it('adds from an array', function () {
          meetings.add([meeting1, meeting2, meeting3, meeting4]);

          expect(meetings.length).toEqual(4);
        });
      });

      describe('#comperator', function () {
        it('sorts the meetings by startTime', function () {
          meetings.add([meeting4, meeting3, meeting2, meeting1]);

          expect(meetings.at(0)).toEqual(meeting1);
          expect(meetings.at(1)).toEqual(meeting2);
          expect(meetings.at(2)).toEqual(meeting3);
          expect(meetings.at(3)).toEqual(meeting4);
        });
      });

      describe('#parse', function () {
        it('should return the items in the google response', function () {
          expect(meetings.parse(CalApp.fixtures.Response))
            .toEqual(CalApp.fixtures.Response.items)
        });

        it('should remove any canceled events', function () {
          var canceledEvent = {
            status:"cancelled"
          };
          CalApp.fixtures.Response.items.push(canceledEvent);

          expect(meetings.parse(CalApp.fixtures.Response)).not.toContain(canceledEvent)
        });
      });
    });
  });
});

describe('Views', function () {
  describe('MeetingView', function () {
    it('should exist', function () {
      expect(CalApp.Views.MeetingView).toBeDefined();
    });

    it('should create a collection when initialized', function () {
      var App = new CalApp.Views.MeetingView;
      expect(App.collection).toBeDefined();
    });
  });
});
